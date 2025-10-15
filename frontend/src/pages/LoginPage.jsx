import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Github, Chrome } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithOAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials (try admin/password)');
        }
    };

    const handleOAuth = async (provider) => {
        await loginWithOAuth(provider);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/70">Sign in to manage your finances</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-indigo-600 font-bold py-3 rounded-lg hover:bg-white/90 transition-colors shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-white/50">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleOAuth('google')}
                            className="flex items-center justify-center py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                            <Chrome className="h-5 w-5 text-white group-hover:text-pink-400 transition-colors" />
                        </button>
                        <button
                            onClick={() => handleOAuth('github')}
                            className="flex items-center justify-center py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                            <Github className="h-5 w-5 text-white group-hover:text-purple-400 transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
