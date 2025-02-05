import { CalendarOutlined, DesktopOutlined, FileTextOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const items = [
  { label: 'Головна', key: '1', icon: <DesktopOutlined /> },
  { label: 'Домашки', key: '7', icon: <ReadOutlined />, },
  { label: 'Розклад', key: '4', icon: <CalendarOutlined />, },
  { label: 'Оцінки', key: '3', icon: <FileTextOutlined />, },
  { label: 'Предмети', key: '2', icon: <FileTextOutlined />, },
  { label: 'Вчителі', key: '5', icon: <UserOutlined />, },
];

const Sidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (collapsed: boolean) => void }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={setCollapsed} 
      style={{ minHeight: '100vh', position: 'fixed' }}>
        <div className="demo-logo-vertical" />
        <Menu mode="inline" items={items} />
      </Sider>
    </div>
  );
};

export default Sidebar;
