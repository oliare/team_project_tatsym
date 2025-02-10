import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/students/login/LoginPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
