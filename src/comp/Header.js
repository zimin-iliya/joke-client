import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo,avatar, setAvatar } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);


  async function Logout() {
    try {
      await fetch("http://localhost:4000/logout", {
        credentials: "include",
      });
      setUserInfo(false);
      setRedirect(true);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
    fetchImg();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }

  async function fetchImg() {
    try {
      const response = await fetch("http://localhost:4000/avatars", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setAvatar(data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <div className="header">
        <header>
          <div className="header-right">
            <Link to="/" className="header-link">
              Home
            </Link>
          </div>

          <nav>
            {userInfo?.username ? (
              <>
                <Link to="/create">Add a joke</Link>
                <Link to="/profile">{userInfo.username}</Link>
                <Link to="/login" onClick={Logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  );
}
