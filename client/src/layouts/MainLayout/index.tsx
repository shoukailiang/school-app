import { FC, useEffect } from "react";
import { NavBar } from "antd-mobile";
import { Outlet, useLocation } from "react-router-dom";
import NavBottom from "@/components/navBottom";
import styles from "./index.module.scss";
import Auth from "@/components/auth";
import tabs from "@/data/bottom";
import { getMsgListReducer } from "@/store/chatReducer";
import { getMessageListService } from "@/services/chat";
import { useDispatch } from "react-redux";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useRequest } from "ahooks";

const MainLayout: FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { chatmsg } = useGetChatInfo();
  const { data, run, loading } = useRequest(
    async () => {
      const data = await getMessageListService();
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(getMsgListReducer(res));
      },
    }
  );
  useEffect(() => {
    if (chatmsg.length == 0) {
      run();
    }
  }, []);
  return (
    <>
      <Auth />
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar>{tabs.find((item) => item.key === pathname)?.title}</NavBar>
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
