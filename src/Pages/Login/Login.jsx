import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios at the top
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (data) => {
        setLoading(true);
        try {
            await signIn(data.email, data.password);
            setErrorMessage('');
            toast.success("Login successful!"); // Show success toast
            navigate('/');
        } catch (error) {
            setErrorMessage("Login failed: " + error.message);
            toast.error("Wrong password or email!"); // Show error toast
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle(); // Get structured user data
            const { displayName, email, photoURL } = user;

            const userData = {
                name: displayName,
                email: email,
                photoURL: photoURL,
            };

            await axios.post('http://localhost:5000/users', userData);
            setErrorMessage('');
            toast.success("Login successful!"); // Show success toast for Google login
            navigate('/');
        } catch (error) {
            console.error("Google login failed:", error);
            setErrorMessage("Google login failed: " + error.message);
            toast.error("Google login failed!"); // Show error toast
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Login to Your Account</h2>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                        {loading ? 'Processing...' : 'Sign In'}
                    </button>
                </form>

                <div className="flex items-center justify-center space-x-2">
                    <span className="block w-16 h-px bg-gray-300"></span>
                    <span className="text-sm font-medium text-gray-500">or</span>
                    <span className="block w-16 h-px bg-gray-300"></span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    <span>Sign in with Google</span>
                </button>

                <p className="text-center text-sm text-white">
                    Don't have an account?
                    <Link to="/register" className="text-blue-500 hover:underline"> Sign Up</Link>
                </p>
            </div>
            <ToastContainer /> {/* Add ToastContainer for toast notifications */}
        </div>
    );
};

export default Login;
