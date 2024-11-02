import { useState, useRef } from "react";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { CgList } from "react-icons/cg";
import { IoMdLogIn } from "react-icons/io";
import '../../../GoogleFont/fonts.css'

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loginButtonRef = useRef(null);

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <div className="relative inter">
            {/* Header */}
            <div className="lg:flex items-center justify-between p-4 bg-gray-800 text-white flex-wrap">
                {/* Logo and Title */}
                <div className="lg:flex items-center space-x-2 text-center  text-xl">
                    <h1 className="text-2xl font-bold">Resell Market</h1>
                </div>

                {/* Search Input with Search Button */}
                <div className=" items-center flex-1 mx-4 mt-2">
                    <div className="flex items-center w-full md:w-[600px] mx-2">
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

                {/* Icons: Add to Cart, Wishlist, Signup */}
                <div className="flex lg:items-center space-x-4 md:mx-auto gap-4 ml-3 md:gap-6 justify-end mt-4 md:mt-0">
                    <button className="flex items-center text-2xl">
                        <FaCartPlus />
                    </button>
                    <button className="flex items-center text-2xl">
                        <CgList />
                    </button>
                    {/* Login Button with Modal */}
                    <button
                        ref={loginButtonRef}
                        className="flex items-center text-[28px]"
                        onClick={toggleModal}
                    >
                        <IoMdLogIn />
                    </button>
                </div>
            </div>

            {/* Modal positioned below Login Button */}
            {isModalOpen && (
                <div
                    className="absolute bg-white p-4 rounded-md shadow-lg mt-2 right-4 w-40 text-gray-800"
                    style={{ top: loginButtonRef.current?.offsetTop + 40 }}
                >
                    <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-2">
                        Login
                    </button>
                    <button className="w-full p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mb-2">
                        Register
                    </button>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
