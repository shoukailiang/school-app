import { FC } from "react";
import { TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router-dom";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import tabs from "@/data/bottom";
const NavBottom: FC = () => {
  const { type } = useGetUserInfo();
  const {unread} = useGetChatInfo();
  const nav = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    nav(value);
  };

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map(
        (item) =>
          item.key.slice(1) !== type && (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title}  badge={item.key.slice(1)=="msg"?unread:null}/>
          )
      )}
    </TabBar>
  );
};

export default NavBottom;
