import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1 className="cpHeader">Create A Post</h1>
        <div className="inputGp">
          <label className="inputLabel" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            placeholder="Your title"
            id="title"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label className="inputLabel" htmlFor="text">
            Post
          </label>
          <textarea
            name=""
            id="text"
            cols="30"
            rows="10"
            placeholder="Your news"
            onChange={event => {
              setPostText(event.target.value);
            }}
          ></textarea>
        </div>
        <button className="createPostBtn">
          <IoIosAdd className="createPostIcon" onClick={createPost} />
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
