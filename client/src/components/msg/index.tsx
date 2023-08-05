import useGetChatInfo from "@/hooks/useGetChatInfo";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import styles from "./index.module.scss";
import { useNavigate } from "react-router";
import { FC } from "react";
const Msg: FC = () => {
  const nav = useNavigate();
  const getLast = (arr: []) => {
    return arr[arr.length - 1];
  };
  const msgGroup: any = {};
  const { _id } = useGetUserInfo();
  const { users, chatmsg } = useGetChatInfo();
  chatmsg.forEach((v) => {
    msgGroup[v.chatid] = msgGroup[v.chatid] || [];
    msgGroup[v.chatid].push(v);
  });
  // 将消息后发的放在前面
  const chatList = Object.values(msgGroup).sort((a, b) => {
    const a_last = getLast(a).create_time;
    const b_last = getLast(b).create_time;
    return b_last - a_last;
  });
  return (
    <>
      <div className={styles["msg-container"]}>
        {chatList.map((v) => {
          // 用来获取发过来的最后一条信息
          const lastItem = getLast(v);
          const targetId = _id === v[0].from ? v[0].to : v[0].from;
          if (!users[targetId]) {
            return null;
          }
          // 在右侧的数量
          const unreadNum = v.filter(
            (item) => !item.read && item.to === _id
          ).length;
          return (
            <div
              className={styles["msg-item"]}
              key={lastItem._id}
              onClick={() => {
                // 点击聊天项跳转到聊天页面
                nav(`/chat/${targetId}`);
              }}
            >
              <div className={styles["msg-name-avatar"]}>
                <img
                  src={`https://shoukailiang-blog.oss-cn-hangzhou.aliyuncs.com/article/${users[targetId].avatar}.png`}
                  alt="avatar"
                />
                <b>{users[targetId].name}</b>
              </div>
              <p className={styles["msg-content"]}>内容：{lastItem.content}</p>
              {unreadNum ? (
                <span className={styles["msg-circle"]}>{unreadNum}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Msg;
