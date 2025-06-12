import React, { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name,
          mobile,
          email,
          uid: user.uid,
        });
        toast.success("Registered successfully!");
      }
      navigate("/home", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate("/home", { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-900 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900"
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold text-base"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t w-full border-gray-300"></div>
          <span className="px-3 text-gray-600 text-sm">or</span>
          <div className="border-t w-full border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full flex items-center justify-center bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition duration-200 font-semibold text-base"
        >
          <FaGoogle className="mr-2" />
          Sign in with Google
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-200 font-semibold text-base"
        >
          Go to Main Page
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
