import { formatISO9075 } from "date-fns";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../comp/UserContext";
import picture from "../IMG/logoface.png";

export default function Post(joke) {
  const { userInfo, avatar } = useContext(UserContext);
  const [imgIndex, setImgIndex] = useState('')

  useEffect(() => {
    if (avatar.length > 0) {
      const targetValue = (joke.joke.userId)?.toLowerCase() + ".jpg";
      const index = avatar.findIndex((item) =>
        item.data.publicUrl.endsWith(targetValue)
      );
      console.log(index);
      setImgIndex(index);
    }
  }, [avatar]);

  function handleEdit() {
    window.location.href = `/edit/${joke.joke._id}`;
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:4000/jokes/${joke.joke._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="postbody">
      <div className="card">
        <div className="card-header">
          <div className="postimage">
            <img
              className="logo-face"
                src={`${avatar[imgIndex]?.data.publicUrl}`}
                alt="joke"
            />
          </div>
          <div className="joke-text">
            <p>{joke.joke.content}</p>
          </div>
        </div>
        <div className="postauthor">
          <div className="author-right">
            <strong>by {joke.joke.username}</strong>
            <time>
              {formatISO9075(new Date(joke.joke.createdAt), {
                representation: "date",
              })}
            </time>
          </div>
          <div className="author-left">
            <button
              style={{
                display:
                  userInfo.username !== joke.joke.username
                    ? "none"
                    : "inline-block",
              }}
              disabled={userInfo.username !== joke.joke.username}
              onClick={handleEdit}
              className={
                userInfo.username !== joke.joke.username
                  ? "postbuttondsbl"
                  : "postbutton"
              }
            >
              Edit
            </button>
            <button
              style={{
                display:
                  userInfo.username !== joke.joke.username
                    ? "none"
                    : "inline-block",
              }}
              disabled={userInfo.username !== joke.joke.username}
              onClick={handleDelete}
              className={
                userInfo.username !== joke.joke.username
                  ? "postbuttondsbl"
                  : "postbutton"
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
