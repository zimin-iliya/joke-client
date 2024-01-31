import { Outlet } from "react-router-dom";
import Header from "./Header";
import HeaderLogo from "./HeaderLogo";

export default function Layout() {
    
    return (

       <main>
            <Header />
            <HeaderLogo />
            <Outlet />
        </main>
    )
    }