import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase"; // ✅ import Firestore
import { doc, getDoc } from "firebase/firestore"; // ✅
import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // 🔽 Extra Firestore info
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // 🔽 Fetch user data from Firestore
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
        alert("Logged out!");
        navigate("/", { replace: true });
      })
      .catch((error) => alert(error.message));
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Home Page</h1>

        <div className="flex items-center space-x-4">
          <Link
            to="/favourites"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Go to Favourites
          </Link>

          <div className="relative">
            {/* 👤 User Icon Button */}
            <button
              onClick={toggleDropdown}
              className="text-3xl text-gray-700 hover:text-black"
            >
              <FaUserCircle />
            </button>

            {/* 🔽 Dropdown */}
            {showDropdown && user && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded p-4 w-64 z-50">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                {userInfo?.name && (
                  <p>
                    <strong>Name:</strong> {userInfo.name}
                  </p>
                )}
               
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MainPage />
    </div>
  );
};

export default HomePage;
