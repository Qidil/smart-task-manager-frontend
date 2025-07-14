import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/smart-task-manager-icon.svg";
import EyeIcon from "../assets/eye-icon.svg";
import EyeOffIcon from "../assets/eye-off-icon.svg";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim() || password !== confirmPassword) {
      setError("Please check your inputs.");
      return;
    }

    try {
      await API.post("/auth/signup", { email, password });

      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#252525] text-black dark:text-white flex flex-col items-center justify-start transition-colors duration-300">
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="App Logo" className="w-24 h-auto mb-2" />
        <h1 className="text-2xl font-bold tracking-wider text-center">
          SMART TASK MANAGER
        </h1>
      </div>

      <div className="w-full max-w-md border border-indigo-500 rounded-xl p-6 bg-white dark:bg-[#252525] transition-colors duration-300">
        <h2 className="text-xl font-bold text-center">Sign In</h2>
        <p className="text-sm text-center mb-6">Create new account</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && (
            <div className="text-sm text-red-500 text-start mb-2">{error}</div>
          )}
          <p className="text-lg font-semibold text-start mb-2">Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white dark:bg-[#252525] transition-colors duration-300"
            autoComplete="off"
            required
          />
          <p className="text-lg font-semibold text-start mb-2">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white dark:bg-[#252525] pr-10 transition-colors duration-300"
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-3 transform"
            >
              <img
                src={showPassword ? EyeIcon : EyeOffIcon}
                alt="toggle password visibility"
                className="w-5 h-5 transition"
              />
            </button>
          </div>

          <p className="text-lg text-start font-semibold mb-2">Confirm Password</p>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-6 border border-indigo-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white dark:bg-[#252525] pr-10 transition-colors duration-300"
              autoComplete="off"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 transform text-indigo-500 hover:text-indigo-600"
              title={
                showConfirm ? "Hide confirm password" : "Show confirm password"
              }
            >
              <img
                src={showConfirm ? EyeIcon : EyeOffIcon}
                alt="toggle confirm"
                className="w-5 h-5"
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-[100px] bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed right-6 bottom-6 w-10 h-10 flex items-center justify-center bg-indigo-500 text-white rounded hover:bg-indigo-600"
        title="Toggle theme"
      >
        <img
          src={
            isDark
              ? "../src/assets/light-toggle-icon.svg"
              : "../src/assets/dark-toggle-icon.svg"
          }
          alt="theme toggle"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
