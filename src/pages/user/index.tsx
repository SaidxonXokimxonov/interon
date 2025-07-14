import { useState, useEffect } from "react";
import {
  updateEmail,
  updatePassword,
  updateProfile,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./../../config/firebase";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData({
          displayName: currentUser.displayName || "",
          email: currentUser.email || "",
          password: "",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }
      if (formData.password.trim() !== "") {
        await updatePassword(user, formData.password);
      }
      if (formData.displayName !== user.displayName) {
        await updateProfile(auth?.currentUser!, { displayName: formData.displayName });
      }

      toast.success("Profile updated successfully!", {
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }
      });
      
      // Refresh user data
      setUser({ ...user, 
        displayName: formData.displayName, 
        email: formData.email 
      });

      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message || "Failed to update profile"}`, {
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4ff] to-[#e6f7ff]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const firstLetter = (user.displayName || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-4 bg-gradient-to-br from-[#f0f4ff] to-[#e6f7ff]">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <div className={'bg-gradient-to-r from-blue-500 to-indigo-500 w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg'}>
              {firstLetter}
            </div>
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.displayName}</h1>
            <p className="text-gray-600 mb-6">{user.email}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Account Created</h3>
                <p className="font-medium text-gray-800">
                  {user.metadata.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString() 
                    : "N/A"}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-1">Last Sign In</h3>
                <p className="font-medium text-gray-800">
                  {user.metadata.lastSignInTime 
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString() 
                    : "N/A"}
                </p>
              </div>
            </div>
            
            <button
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-8 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <p className="text-blue-100 text-sm">Update your account information</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                
               {
                auth.currentUser?.providerData[0].providerId !== 'google.com' ?  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
                </div> : " "
               }
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  className="bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl font-medium transition"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition flex items-center justify-center gap-2"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;