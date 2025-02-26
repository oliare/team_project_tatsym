import Header from "../components/header/Header";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header onToggleCollapse={handleToggleCollapse} />
      <div className="flex flex-1 overflow-hidden"> 
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 overflow-auto ml-20 "> 
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;