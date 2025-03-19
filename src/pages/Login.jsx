import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const { data } = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            toast.success("Logged in successfully!");
            navigate('/dashboard'); // Redirect after login
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-500 hover:bg-blue-600 transition text-white p-2 rounded cursor-pointer">
                        Login
                    </button>
                </form>
                <p className="mt-3 text-sm text-center text-gray-700">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
