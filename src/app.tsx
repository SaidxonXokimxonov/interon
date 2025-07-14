import { useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/home";
import Tests from "./pages/tests";
import Results from "./pages/results";
import Test from "./pages/tests/components/test";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import User from "./pages/user/index";
import { useEffect } from "react";
import CurrentResult from "./pages/current-result";
import Result from "./pages/results/components/full-result";
import ProfileMenu from "./pages/user/comonents/avatar";

import {
  FiUser,
  FiBook,
  FiBarChart2,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
  FiBookOpen,
  FiLogOut,
} from "react-icons/fi";
import { logout } from "./redux/reducers/user";

export default function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
    if (user) localStorage.setItem("user", `${JSON.stringify(user)}`);
  }, [user]);

  function signOut() {
    dispatch(logout());
    navigate("/");
    localStorage.removeItem("user");
  }

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="w-full bg-white shadow-sm px-4 py-3 md:px-8 md:py-4 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-blue-100">
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 tracking-wide flex items-center gap-2"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 w-8 h-8 rounded-lg flex items-center justify-center">
            <FiBookOpen className="text-white text-lg" />
          </div>
          Interon
        </NavLink>
        <div className="hidden md:flex gap-6 items-center">
          {userData ? (
            <>
              <NavLink
                to="/user/tests"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                <FiBook className="text-lg" />
                Tests
              </NavLink>
              <NavLink
                to="/user/results"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                <FiBarChart2 className="text-lg" />
                Results
              </NavLink>
              <ProfileMenu />
            </>
          ) : (
            <div className="flex gap-3 items-center">
              <NavLink
                to="/auth/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-2"
              >
                <FiLogIn />
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="bg-white text-blue-600 border border-blue-200 px-5 py-2 rounded-full hover:bg-blue-50 transition-all shadow-sm hover:shadow-md font-medium flex items-center gap-2"
              >
                <FiUserPlus />
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-blue-700 cursor-pointer text-2xl focus:outline-none"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#8080804f] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-xl p-4 animate-fade-in-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-3">
              {userData ? (
                <>
                  <NavLink
                    to="/user/tests"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    <FiBook className="text-lg" />
                    Tests
                  </NavLink>
                  <NavLink
                    to="/user/results"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    <FiBarChart2 className="text-lg" />
                    Results
                  </NavLink>
                  <NavLink
                    to="/user/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    <FiUser className="text-lg" />
                    Profile
                  </NavLink>
                  <button
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        cursor-pointer text-red-600 hover:bg-blue-50"
                  >
                    <FiLogOut className="text-lg" />
                    Profile
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/auth/login"
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all font-medium flex items-center gap-3"
                  >
                    <FiLogIn />
                    Login
                  </NavLink>
                  <NavLink
                    to="/auth/register"
                    className="bg-white text-blue-600 border border-blue-200 px-4 py-3 rounded-lg hover:bg-blue-50 transition-all font-medium flex items-center gap-3"
                  >
                    <FiUserPlus />
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/profile" element={<User />} />
          <Route path="user/tests" element={<Tests />} />
          <Route path="user/tests/:testId" element={<Test />} />
          <Route path="user/results" element={<Results />} />
          <Route path="user/results/:resultId" element={<Result />} />
          <Route path="user/currentResult" element={<CurrentResult />} />

          <Route
            path="auth"
            element={user ? <Navigate to="/user" /> : <Outlet />}
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route index path="*" element={<Navigate to="/auth/login" />} />
          </Route>
        </Routes>
      </main>

      <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center">
                  <FiBookOpen className="text-blue-700 text-lg" />
                </div>
                <h3 className="text-xl font-bold">Interon</h3>
              </div>
              <p className="text-blue-100 max-w-xs">
                Elevate your knowledge and skills with our comprehensive testing
                platform.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className="text-blue-100 hover:text-white transition"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/tests"
                    className="text-blue-100 hover:text-white transition"
                  >
                    Tests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user/results"
                    className="text-blue-100 hover:text-white transition"
                  >
                    Results
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/user"
                    className="text-blue-100 hover:text-white transition"
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>xokimxonovsaidxon006@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span>+998 93 615-26-06</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span>Tashkent, Uzbekistan</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-200 text-sm">
            © {new Date().getFullYear()} Interon. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
