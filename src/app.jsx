import { useState } from "preact/hooks";
import "./app.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainPage from "./Pages/MainPage";
import Favourites from "./Pages/Favourites";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import MovieDataPage from "./Pages/MovieDataPage";
import Landingpage from "./Pages/Landingpage";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/movie/:id" element={<MovieDataPage />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
