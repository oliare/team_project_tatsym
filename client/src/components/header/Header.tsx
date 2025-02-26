import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

interface CustomHeaderProps {
  onToggleCollapse: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onToggleCollapse }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <Header className="flex items-center justify-between px-6 bg-white border-b border-gray-300 z-50">
      <div
        onClick={onToggleCollapse}
        className="w-7 ml-1 cursor-pointer opacity-60 transition-opacity border-2 border-transparent hover:bg-zinc-200 rounded-lg">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_iconCarrier">
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#01274e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>

      <div className="flex items-center">
        <img src={"/images/logo.png"} alt="TatsYM" width={150} />
      </div>

      <div className="ml-auto">
        <img
          src={"images/student.png"}
          alt="User Avatar" 
          className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 hover:border-gray-500"
          onClick={() => navigate("/userProfile")}
        />
      </div>
      <button
        onClick={handleLogout}
        className="flex bg-[#86aac0] hover:bg-[#6b8a9e] border-none text-white items-center px-2 ml-5 py-1 text-base font-semibold text-white rounded-lg shadow-md transition hover:bg-cyan-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
        Вихід
      </button>
    </Header>
  );
};

export default CustomHeader;
