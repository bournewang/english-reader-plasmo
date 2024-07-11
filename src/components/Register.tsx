import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { registerUser } from '../api/user';
import "../styles/tailwind.css"

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            setMessage('Registration successful!');
        } catch (error) {
            if (error instanceof Error) {
                // If error is of type Error, it has a message property
                setMessage(error.message || 'Registration failed');
              } else {
                setMessage('Registration failed');
              }
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </form>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
};

export default Register;
