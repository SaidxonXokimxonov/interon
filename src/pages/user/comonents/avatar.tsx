import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/user";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function signOut() {
    dispatch(logout());
    navigate("/");
    localStorage.removeItem("user");
  }

  const userJson = localStorage.getItem("user");
  const userData = userJson ? JSON.parse(userJson) : null;

  const firstLetter = (userData?.displayName || "U").charAt(0).toUpperCase();

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="w-10 h-10 cursor-pointer rounded-full mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center text-[18px] font-bold shadow-md"
      >
        {firstLetter}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          <NavLink
            to="/user/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </NavLink>
          <button
            onClick={signOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
