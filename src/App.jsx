import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import FoodDetail from "./pages/FoodDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/food/:id" element={<FoodDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
