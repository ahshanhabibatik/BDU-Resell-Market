import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hook/useAdmin";
import { FaAd, FaHome, FaList, FaUser } from "react-icons/fa";
import { BsArrowsCollapseVertical } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import "../GoogleFont/fonts.css";

const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [collapsed, setCollapsed] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const sidebarRef = useRef(null); // Ref for sidebar

    // Toggle collapse state
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    // Close sidebar when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setShowMobileMenu(false); // Close sidebar
            }
        };

        if (showMobileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMobileMenu]);

    return (
        <div className="flex min-h-screen bg-gray-100 inter">
            {/* Mobile Menu Toggle Button */}
            <div className="p-4 fixed z-20 md:hidden">
                <button onClick={toggleMobileMenu} className="text-purple-600">
                    <FiMenu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                ref={sidebarRef} // Assign ref to sidebar
                className={`fixed md:relative z-10 bg-gradient-to-b from-purple-600 to-indigo-700 text-white md:min-h-screen ${collapsed ? 'w-20' : 'w-60'} ${showMobileMenu ? 'block' : 'hidden'} md:block transition-all duration-300`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h2 className={`text-lg font-bold ${collapsed && 'hidden'}`}>Dashboard</h2>
                    {/* Toggle button */}
                    <button onClick={toggleSidebar} className="text-white hover:text-gray-300">
                        <BsArrowsCollapseVertical size={24} />
                    </button>
                </div>

                {/* Menu items */}
                <ul className="menu space-y-2 mt-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/adminHome"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)} // Close menu on click
                                >
                                    <FaHome size={20} />
                                    {!collapsed && <span>Admin Home</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/Users"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)} // Close menu on click
                                >
                                    <FaUser size={20} />
                                    {!collapsed && <span>Manage User</span>}
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/userHome"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)} // Close menu on click
                                >
                                    <FaHome size={20} />
                                    {!collapsed && <span>User Home</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/review"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)} // Close menu on click
                                >
                                    <FaAd size={20} />
                                    {!collapsed && <span>My Review</span>}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/bookings"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)} // Close menu on click
                                >
                                    <FaList size={20} />
                                    {!collapsed && <span>My Bookings</span>}
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Divider */}
                    <div className="border-t border-indigo-600 my-4"></div>

                    {/* Shared nav link */}
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-indigo-800 text-yellow-300' : 'hover:bg-indigo-600'
                                }`
                            }
                            onClick={() => setShowMobileMenu(false)} // Close menu on click
                        >
                            <FaHome size={20} />
                            {!collapsed && <span>Home</span>}
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Main content area */}
            <div className="flex-1 p-10 bg-white md:ml-0 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
