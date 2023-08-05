import React, { FC, useState } from "react";
import { NavBar, TabBar } from "antd-mobile";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import styles from "./index.module.scss";
import Auth from "@/components/auth";

const Bottom: FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    nav(value);
  };

  const tabs = [
    {
      key: "/boss",
      title: "牛人",
      icon: <AppOutline />,
    },
    {
      key: "/genius",
      title: "天才",
      icon: <UnorderedListOutline />,
    },
    {
      key: "/msg",
      title: "消息",
      icon: <MessageOutline />,
    },
    {
      key: "/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

const MainLayout: FC = () => {
  return (
    <>
      <Auth />
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar>
            {/* 获取url,然后url匹配对应的key，现实出对应的tiele */}
            后面在改
          </NavBar>
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
