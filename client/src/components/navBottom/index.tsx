import { FC } from "react";
import { TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import tabs from "@/data/bottom";
const NavBottom: FC = () => {
    
  const nav = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    nav(value);
  };



  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

export default NavBottom;
