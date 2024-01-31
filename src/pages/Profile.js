import React from "react";
import Post from "../comp/Post";
import { UserContext } from "../comp/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";


export default function Profile() {
  const [userJokes, setuserJokes] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { userInfo,avatar } = useContext(UserContext);

  async function ShowUserJokes() {
    console.log(userInfo);
    try {
      const response = await fetch(`http://localhost:4000/jokes/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setuserJokes(data);
        console.log(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImage(imageFile) {
    console.log("Uploading image:", imageFile);
    const formData = new FormData();
    formData.append("image",imageFile );
    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
        const data = await response.json();
        setRedirect(true);
      } else {
        console.log("Error uploading image");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="postbody">
      <div className="profile">
        <div className="postimage">
          <div className="profile-top">
            <strong>Username: {userInfo.username}</strong>
          </div>
          <div className="profile-middle">
            <img className="logo-face" src={""} alt="joke" />
            <p>
              Email: <br />
              <br />
              password: <br />
            </p>
          </div>
          <div className="profile-bottom">
            <input
              className="fileupload"
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
             <button onClick={ShowUserJokes}>show all my jokes</button>
          </div>
        </div>
      </div>
      {userJokes.length ? (
        userJokes.map((joke) => <Post key={joke._id} joke={joke} />)
      ) : (
        <></>
      )}
    </div>
  );
}
