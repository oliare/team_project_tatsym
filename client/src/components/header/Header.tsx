import { Layout } from "antd";

const { Header } = Layout;

const CustomHeader = ({ onToggleCollapse }: { onToggleCollapse: () => void }) => {

  return (
    <Header className="flex items-center px-6 bg-white border-b border-gray-300 z-50">
      <div onClick={() => { onToggleCollapse(); }}
        className="w-7 ml-1 cursor-pointer opacity-60 transition-opacity border-2 border-transparent hover:bg-zinc-200 rounded-lg">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#01274e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </div>
      <div className="flex items-center mb-4 pl-2">
        <img src={"/images/logo.png"} alt="TatsYM" width={150} />
      </div>
    </Header>
  );
};

export default CustomHeader;
