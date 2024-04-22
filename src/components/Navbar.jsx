import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase-config";
import {
  IoHomeOutline,
  IoDuplicateOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { CiLogin, CiLogout } from "react-icons/ci";

const Navbar = ({ isAuth, setIsAuth }) => {
  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
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
      <Link to="/">
        <IoHomeOutline className="navbarIcons" />
        <p className="navbarLabels">Home</p>
      </Link>
      {!isAuth ? (
        <Link to="/" onClick={signInWithGoogle}>
          <CiLogin className="navbarIcons" />
          <p className="navbarLabels">Log In</p>
        </Link>
      ) : (
        <>
          <Link to="/createpost">
            <IoDuplicateOutline className="navbarIcons" />
            <p className="navbarLabels">Create Post</p>
          </Link>
          <Link to="/" onClick={signUserOut}>
            <CiLogout className="navbarIcons" />
            <p className="navbarLabels">Log Out</p>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
