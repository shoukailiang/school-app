import { FC, useEffect } from "react";
import { NavBar } from "antd-mobile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBottom from "@/components/navBottom";
import styles from "./index.module.scss";
import Auth from "@/components/auth";
import tabs from "@/data/bottom";
import { getMsgListReducer } from "@/store/chatReducer";
import { getMessageListService,recvMsgService } from "@/services/chat";
import { useDispatch } from "react-redux";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useRequest } from "ahooks";

const MainLayout: FC = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const { _id } = useGetUserInfo();
  const { chatmsg } = useGetChatInfo();
  const { run:getMsgListRun, loading: getMsgListLoading } = useRequest(
    async () => {
      const data = await getMessageListService();
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(getMsgListReducer({...res,userid:_id}));
      },
    }
  );

  useEffect(() => {
    if (chatmsg.length == 0) {
      getMsgListRun();
      recvMsgService();
    }
  }, []);

  const back = () => {
    nav(-1);
  }
  return (
    <>
      <Auth />
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar onBack={back}>
            {
              tabs.find((item) => item.key === pathname)?.title
            }
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
