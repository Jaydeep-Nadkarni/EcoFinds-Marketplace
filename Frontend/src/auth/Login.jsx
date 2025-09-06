import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded py-2 hover:bg-green-700"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
