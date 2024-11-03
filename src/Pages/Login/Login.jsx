import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        try {
            await signIn(data.email, data.password);
            navigate('/'); // Redirect after successful login
            toast.success("Login successful!", {
                duration: 2000,
                position: 'top-center'
            });
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            navigate('/'); // Navigate after successful login
            toast.success("Google login successful!", {
                duration: 2000,
                position: 'top-center'
            });
        } catch (error) {
            console.error("Google sign-in failed:", error);
            toast.error("Google sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 border rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white">Login to Your Account</h2>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className={`w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Signing In with Google...' : 'Sign In with Google'}
                </button>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
