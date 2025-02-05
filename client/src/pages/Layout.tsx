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
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onToggleCollapse={handleToggleCollapse} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main style={{ padding: "0 6rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
