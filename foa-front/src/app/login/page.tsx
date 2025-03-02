//file to create login page
'use client'

import { useState } from "react";
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState("");
  const router = useRouter();


  const handleLogin = async () => {
    setLoading(true); // loading while request
    try {
        await login({ username, password });
        router.push('/');
      } catch {
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center h-screen bg-gray-200 w-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center text-black">Login to Order Food</h2>

          {error && <p className="text-red-500">{error}</p>} {/* Tampilkan error jika ada */}

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={`w-full text-white p-2 rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          
          <p className="text-center mt-4 text-black">
          New user? <Link href="/register" className="text-green-500 hover:text-green-600">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;