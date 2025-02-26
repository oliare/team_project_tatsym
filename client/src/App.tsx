import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/student/home/HomePage.tsx";
import LoginPage from "./pages/student/login/LoginPage.tsx";
import UserMaterials from "./pages/student/userMaterials/UserMaterials.tsx";
import HomeAssignments from "./pages/student/assignments/HomeAssignments.tsx";
import NotFoundPage from "./common/NotFoundPage.tsx";
import PaymentPage from "./pages/student/payment/PaymentPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";

const placeHolder = "./public/images/elementor-placeholder-image.jpg"
const user = {
  name: "John",
  surname: "Doe", 
  email: "john.doe@example.com",
  phone: "123-456-7890",
  bio: "nothing yet",
  avatarUrl: placeHolder,
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userMaterials" element={<UserMaterials />} />
          <Route path="/homeAssignments" element={<HomeAssignments />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/userProfile" element={<UserProfile user={user} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;