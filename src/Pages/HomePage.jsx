import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";

import { toast } from "react-toastify";
const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserInfo(userDoc.data());
        }
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.info("Logged out!");
        navigate("/auth", { replace: true });
      })
      .catch((error) => toast.error(error.message));
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-indigo-900">
          MovieHive
        </h1>

        <div className="flex items-center space-x-4">
          <Link
            to="/favourites"
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-indigo-200 transition duration-200 shadow-sm"
          >
            ⭐ Go to Favourites
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-3xl text-indigo-600 hover:text-indigo-700 transition"
            >
              <FaUserCircle />
            </button>

            {/* Dropdown */}
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg p-4 w-64 z-50">
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">Email:</strong> {user.email}
                </p>
                {userInfo?.name && (
                  <p className="text-sm text-gray-700 mt-1">
                    <strong className="text-gray-900">Name:</strong>{" "}
                    {userInfo.name}
                  </p>
                )}

                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-8 py-6">
        <MainPage />
      </main>
    </div>
  );
};

export default HomePage;
