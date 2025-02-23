import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/student/home/HomePage.tsx";
import LoginPage from "./pages/student/login/LoginPage.tsx";
import UserMaterials from "./pages/student/userMaterials/UserMaterials.tsx";
import HomeAssignments from "./pages/student/assignments/HomeAssignments.tsx";
import NotFoundPage from "./common/NotFoundPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userMaterials" element={<UserMaterials />} />
          <Route path="/homeAssignments" element={<HomeAssignments />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;