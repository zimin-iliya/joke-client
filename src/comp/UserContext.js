import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState("");
  const [avatar, setAvatar] = useState("");
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo,avatar,setAvatar }}>
      {children}
    </UserContext.Provider>
  );
}
