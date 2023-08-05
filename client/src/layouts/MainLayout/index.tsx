import { FC } from "react";
import { NavBar } from "antd-mobile";
import { Outlet, useLocation } from "react-router-dom";
import NavBottom from "@/components/navBottom";
import styles from "./index.module.scss";
import Auth from "@/components/auth";
import tabs from "@/data/bottom";

const MainLayout: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <Auth />
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar>
            {tabs.find((item) => item.key === pathname)?.title}
          </NavBar>
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
        <div className={styles.bottom}>
          <NavBottom />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
