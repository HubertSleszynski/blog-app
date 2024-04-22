import React, { useEffect, useState } from "react";
import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FaTrashAlt } from "react-icons/fa";

const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async id => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  return (
    <div className="homePage">
      {postLists.map((post, index) => {
        return (
          <div className="post" key={index}>
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <FaTrashAlt
                  className="deletePostBtn"
                  onClick={() => {
                    deletePost(post.id);
                  }}
                />
              )}
            </div>
            <div className="postTextContainer">{post.postText}</div>
            <h3>@{post.author.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
