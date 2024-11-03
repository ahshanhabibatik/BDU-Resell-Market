import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import useAxiosPublic from '../../Hook/AxiosPublic';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios';

// Initialize ToastContainer at the top level of your app (e.g., in App.js)
import { ToastContainer } from 'react-toastify';

const Register = () => {
    const { createUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_Image_apiKe;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${apiKey}`;
    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(false);

    const uploadImageToImageBB = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axiosPublic.post(image_hosting_api, formData);
            return response.data.data.url;
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
            throw new Error("Failed to upload image");
        }
    };

    const saveUserDataInDatabase = async (userData) => {
        console.log("Sending user data:", userData);
        try {
            await axios.post('http://localhost:5000/users', userData);
            toast.success("User created successfully!", {
                position: 'top-center'
            });
        } catch (error) {
            console.error("Failed to save user data:", error);
            toast.error("Failed to save user data. Please try again.");
            throw new Error("Failed to save user data");
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const photoURL = await uploadImageToImageBB(data.photoURL[0]);

            // Attempt to create user
            await createUser(data.email, data.password);

            const userData = {
                name: data.name,
                email: data.email,
                photoURL: photoURL,
                Role: "user",
            };

            // Send data to your backend
            await saveUserDataInDatabase(userData);

            navigate('/'); // Redirect after successful registration
            reset(); // Reset the form
        } catch (error) {
            console.error("Registration failed:", error);

            // Check if the error indicates that the user already exists
            if (error.response && error.response.status === 400) {
                // Assuming 400 is the status for existing user
                toast.error("User already exists. Please try logging in.");
            } else {
                toast.error("User already exists. Please try logging in.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <ToastContainer /> {/* Add the ToastContainer here */}
            <div className="w-full max-w-md p-8 space-y-6 border rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Create Your Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email Address</label>
                        <input
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    {/* Image Upload Field */}
                    <div>
                        <label className="block text-sm font-medium text-white">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('photoURL', { required: 'Image is required' })}
                            className={`w-full mt-2 text-gray-700 bg-gray-100 border ${errors.photoURL ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                        {errors.photoURL && <span className="text-red-500 text-sm">{errors.photoURL.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        {loading ? 'Processing...' : 'Register'}
                    </button>
                </form>

                {/* Link to Login page */}
                <p className="text-center text-sm text-white">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 hover:underline"> Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
