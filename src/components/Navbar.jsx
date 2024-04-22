import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";

const Navbar = ({ isAuth, setIsAuth }) => {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {!isAuth ? (
        <Link to="/" onClick={signInWithGoogle}>
          Login
        </Link>
      ) : (
        <>
          <Link to="/createpost">Create Post</Link>
          <Link to="/" onClick={signUserOut}>
            Log Out
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
