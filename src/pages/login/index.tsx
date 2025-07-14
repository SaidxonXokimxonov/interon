import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, loginWithGoogle } from "../../redux/reducers/user";
import { type AppDispatch } from "../../redux/store";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as yup from "yup";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email("Email noto'g'ri").required("Email majburiy"),
    password: yup.string().required("Parol majburiy"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await schema.validate({ email, password });
      const result = await dispatch(loginUser({ email, password }));
      const error = result.payload as any;

      if (error.code) toast.error("Email yoki password xato");
      if (loginUser.fulfilled.match(result)) {
        navigate("/user/tests");
        toast(`Welcome back, ${result.payload.displayName}!👋`);
      }
    } catch (err: any) {
      toast.error(err.message || "Ma'lumotda xatolik bor");
    }
  };

  const handleGoogleRegister = async () => {
    const result = await dispatch(loginWithGoogle());
    const error = result.payload as any;
    if (error.code) toast.error("user topilmadi");

    if (loginWithGoogle.fulfilled.match(result)) {
      navigate("/user/tests");
      toast(`Welcome back, ${result.payload.displayName}! 👋`);
    }
  };

  return (
    <>
      <div className="h-screen flex items-start pt-[70px] justify-center bg-gradient-to-br from-blue-50 to-white px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
            Log in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <button
            onClick={handleGoogleRegister}
            className="w-full mt-4 cursor-pointer flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <span className="text-sm text-gray-700">Continue with Google</span>
          </button>

          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <NavLink
              to="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Register here
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
