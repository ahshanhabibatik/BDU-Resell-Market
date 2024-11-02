
import { NavLink } from 'react-router-dom';
import "../GoogleFont/fonts.css"

const Navbar = () => {


    return (
        <nav className="bg-gray-800 text-white inter">
            <div className="mx-4">
                <div className="flex items-center justify-between h-16">

                    {/* Desktop Menu */}
                    <div className="flex space-x-4 text-xl">
                        <NavLink to={"/"} className="hover:text-yellow-500">Home</NavLink>
                        <NavLink to={"/login"} className="hover:text-yellow-500">Shop</NavLink>
                        <NavLink to={"/signUp"} className="hover:text-yellow-500">Categories</NavLink>
                    </div>


                </div>
            </div>

        </nav>
    );
};

export default Navbar;
