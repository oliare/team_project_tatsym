import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { useState } from "react";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleCollapse={handleToggleCollapse} />
      <div className="flex flex-1">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="px-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
