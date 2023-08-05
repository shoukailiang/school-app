import { useRequest } from "ahooks";
import {
  getMessageListService,
  recvMsgService,
  readMsgService,
  sendMsgService,
} from "@/services/chat";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useEffect, useState } from "react";
import { getMsgListReducer } from "@/store/chatReducer";
import { useDispatch } from "react-redux";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import styles from "./index.module.scss";
import { Button } from "antd-mobile";
import { useParams } from "react-router-dom";
import { getChatId } from "@/utils";
const Chat = () => {
  const dispatch = useDispatch();
  const { chatmsg, users } = useGetChatInfo();
  const { _id } = useGetUserInfo();
  const { data, run, loading } = useRequest(
    async () => {
      const data = await getMessageListService();
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        console.log(res);
        dispatch(getMsgListReducer({ ...res, userid: _id }));
      },
    }
  );
  const { user: userid } = useParams();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    if (chatmsg.length == 0) {
      run();
      recvMsgService();
      return () => {
        const to = userid;
        readMsgService(to);
      };
    }
  }, [userid]);
  const handleSend = () => {
    const from = _id;
    const to = userid;
    const content = text;
    sendMsgService({ from, to, content });
    setText("");
  };
  const handleChange = (key: string, e) => {};
  // 表情
  const emoji =
    "😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      // filter 防止会有两个空格
      .filter((v) => v);
  // 去重
  const emoji2 = Array.from(new Set(emoji));
  if (!users[userid]) return null;
  const chatid = getChatId(userid, _id); // 别人的和自己的id
  const chatmsgs = chatmsg.filter((v) => v.chatid === chatid);
  return (
    <div className={styles["chat-container"]}>
      <p className={styles["chat-container-username"]}>
        <a
          onClick={() => {
            // this.props.history.goBack();
          }}
        >
          &lt;
        </a>
        {users[userid].name}
      </p>
      <div className={styles["chat-content"]} >
        {chatmsgs.map((v) => {
          const avatar = (`https://shoukailiang-blog.oss-cn-hangzhou.aliyuncs.com/article/${
            users[v.from].avatar
          }.png`);
          return v.from === userid ? (
            <p key={v._id} className={styles["chat-other"]}>
              <img src={avatar} alt="" />
              <span className={styles["content-container-l"]}>{v.content}</span>
            </p>
          ) : (
            <p key={v._id} className={styles["chat-me"]}>
              <span className={styles["content-container-r"]}>{v.content}</span>
              <img src={avatar} alt="" />
            </p>
          );
        })}
      </div>
      <div
        className={styles["chat-message"]}
        onClick={(e) => {
          if (
            e.target.className === "chat-emoji" ||
            e.target.className === "ant-col-2"
          ) {
            return;
          }
          setShowEmoji(false);
        }}
      >
        <textarea
          className="chat-textarea"
          onChange={(e) => handleChange(e, "text")}
          value={text}
        ></textarea>
        <span
          className={styles["chat-emoji"]}
          aria-label=""
          role="img"
          onClick={() => {
            setShowEmoji(!showEmoji);
          }}
        >
          😄
        </span>
        <Button
          color="primary"
          className={styles["chat-button"]}
          onClick={handleSend}
        >
          发送
        </Button>
        {showEmoji ? (
          <div className={styles["chat-emoji-container"]}>
            <div>
              {emoji2.map((v) => {
                return (
                  <span
                    key={v}
                    title={v}
                    onClick={(e) => {
                      setText(text + e.target.title);
                    }}
                  >
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chat;
