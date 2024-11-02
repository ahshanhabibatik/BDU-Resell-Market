import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold">MyApp</h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4">
                        <NavLink to={"/"} className="hover:text-yellow-500">Home</NavLink>
                        <NavLink to={"/login"} className="hover:text-yellow-500">Login</NavLink>
                        <NavLink to={"/signUp"} className="hover:text-yellow-500">Register</NavLink>

                        <a href="#condition" className="hover:text-yellow-500">Condition</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
                    <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Home</a>
                    <a href="#user" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">User</a>
                    <a href="#blog" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Blog</a>
                    <a href="#condition" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">Condition</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
