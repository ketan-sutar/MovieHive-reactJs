import React, { useState } from "react";
import { auth, provider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(userCredential.user);
        alert("Logged in!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        setUser(user);

        // ✅ Save extra info to Firestore
        await setDoc(doc(db, "users", user.uid), {
          name,
          mobile,
          email,
          uid: user.uid,
        });

        alert("Registered successfully!");
      }
      navigate("/home", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert("Logged in with Google!");
      navigate("/home", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              className="w-full p-2 border rounded"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              className="w-full p-2 border rounded"
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600"
      >
        Sign in with Google
      </button>

      <p className="mt-4 text-sm text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
