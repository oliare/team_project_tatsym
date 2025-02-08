import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Header } = Layout;

const CustomHeader = ({ onToggleCollapse }: { onToggleCollapse: () => void }) => {

  return (
    <Header className="flex items-center px-6 bg-white">
      <MenuOutlined className="text-xl" onClick={onToggleCollapse} />
      <div className="flex items-center mb-4 pl-2">
        <img src={"/images/logo.png"} alt="TatsYM" width={150} />
      </div>
    </Header>
  );
};

export default CustomHeader;
