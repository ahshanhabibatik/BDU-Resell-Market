import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Header from "../Pages/Home/Header/Header";

const Root = () => {
    const location = useLocation();

    // Determine if the current path is either "/login" or "/register"
    const shouldShowHeaderAndNavbar = !['/login', '/register'].includes(location.pathname);

    return (
        <div className="bg-[#010313] mx-2">
            {shouldShowHeaderAndNavbar && <Header />}
            {shouldShowHeaderAndNavbar && <Navbar />}
            <Outlet />
        </div>
    );
};

export default Root;
