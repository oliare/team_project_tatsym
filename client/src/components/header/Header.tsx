import { MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Header } = Layout;

const CustomHeader = ({ onToggleCollapse }: { onToggleCollapse: () => void }) => {

  return (
    <Header style={{ display: "flex", alignItems: "center", padding: "0 25px", backgroundColor:'white' }} >
      <MenuOutlined style={{ fontSize: "18px" }} onClick={onToggleCollapse}/>

      <div style={{ display: "flex", alignItems: "center", marginBottom:'15px', paddingLeft:'10px' }}>
        <img src={"/images/logo.png" } alt="TatsYM" width={150}/>
      </div>
    </Header>
  );
};

export default CustomHeader;
