//file to create register page

'use client';

import useFormReducer from '@/hooks/useFormReducer';
import { register } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface State {
    username: string;
    password: string;
    confirmPassword: string;
    loading: boolean;
    error?: string;
  }
  
  const InitState: State = {
    username: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: '',
};


function Register() {
    const [{ username, password, loading, error, confirmPassword }, updateState] =
    useFormReducer(InitState);
    const router = useRouter();

    async function handleRegister() {
        // if (password !== confirmPassword) {
        //   return alert('Password harus sama!');
        // }
        // updateState({ loading: true });
        try {
          await register({ username, password });
          router.push('/login');
        } catch {
        } finally {
          updateState({ loading: false });
        }
    }

  return (
    <div className="">
      <div className="flex justify-center items-center h-screen bg-gray-200 w-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center text-black">Registration</h2>

          {error && <p className="text-red-500">{error}</p>} {/* Tampilkan error jika ada */}

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-2 border rounded text-black"
            value={username}
            onChange={(e) =>
                updateState({ username: e.currentTarget.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 border rounded text-black"
            value={password}
            onChange={(e) =>
                updateState({ password: e.currentTarget.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-4 border rounded text-black"
            value={password}
            onChange={(e) =>
                updateState({ confirmPassword: e.currentTarget.value })
            }
          />

          <button
            className={`w-full text-white p-2 rounded ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;