import { useState, useRef, useContext, useEffect } from "react";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { CgList } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";
import '../../../GoogleFont/fonts.css';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loginButtonRef = useRef(null);
    const modalRef = useRef(null);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();
        setIsModalOpen(false);
        navigate('/login');
    };

    const handleLoginClick = () => {
        navigate("/login");
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !loginButtonRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inter">
            <div className="lg:flex items-center justify-between p-4 text-white flex-wrap">
                <div className="lg:flex items-center space-x-2 text-center text-xl">
                    <h1 className="text-2xl font-bold">Resell Market</h1>
                </div>

                {/* Search Input */}
                <div className="items-center flex-1 md:mx-4 mt-2">
                    <div className="flex items-center w-full md:w-[600px] mx-auto">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="flex-grow p-2 rounded-l-md border border-gray-300 text-black focus:outline-none focus:border-blue-500"
                        />
                        <button className="p-[13px] bg-blue-500 rounded-r-md hover:bg-blue-600">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Icons */}
                <div className="flex lg:items-center space-x-4 md:mx-auto gap-4 ml-3 md:gap-6 justify-end mt-4">
                    <button className="flex items-center text-2xl">
                        <FaCartPlus />
                    </button>
                    <button className="flex items-center text-2xl">
                        <CgList />
                    </button>
                    <button
                        ref={loginButtonRef}
                        className="flex items-center text-[28px]"
                        onClick={() => setIsModalOpen((prev) => !prev)}
                    >
                        {user ? (
                            <img
                                src={user?.photoURL || user?.imageUrl} // Display the uploaded image
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <IoMdLogIn />
                        )}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    ref={modalRef}
                    className="absolute bg-white p-4 rounded-md shadow-lg mt-2 right-4 w-40 text-gray-800"
                    style={{ top: loginButtonRef.current?.offsetTop + 40 }}
                >
                    {user ? (
                        <>
                            <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2">
                                <Link to="/dashboard">Dashboard</Link>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2" onClick={handleLoginClick}>
                                Login
                            </button>
                            <button className="w-full p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mb-2">
                                <Link to="/register">Register</Link>
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
