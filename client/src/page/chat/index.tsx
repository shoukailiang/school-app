import { useRequest } from "ahooks";
import {
  getMessageListService,
  recvMsgService,
  readMsgService,
  sendMsgService,
} from "@/services/chat";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useEffect, useState } from "react";
import { getMsgListReducer, msgReadReducer } from "@/store/chatReducer";
import { useDispatch } from "react-redux";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import styles from "./index.module.scss";
import { Button, Space, Tag, TextArea } from "antd-mobile";
import { useParams, useNavigate } from "react-router-dom";
import { getChatId } from "@/utils";
const Chat = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { chatmsg, users } = useGetChatInfo();
  const { _id } = useGetUserInfo();
  const { run, loading } = useRequest(
    async () => {
      const data = await getMessageListService();
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(getMsgListReducer({ ...res, userid: _id }));
      },
    }
  );

  const { run: readMsgRun, loading: readMsgLoading } = useRequest(
    async (to) => {
      const data = await readMsgService(to);
      return {num:data,from:to};
    },
    {
      manual: true,
      onSuccess(res: any) {
        console.log(res)
        dispatch(msgReadReducer({ num:res.num, from: res.from }));
        console.log({ num:res, userid: _id })
      },
      onFinally() {
        nav(-1);
      }
    }
  );

  const { user: userid } = useParams();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  useEffect(() => {
    if (chatmsg.length == 0) {
      run();
      recvMsgService();
    }
  }, []);
  const handleSend = () => {
    const from = _id;
    const to = userid;
    const msg = text;
    sendMsgService({ from, to, msg });
    setText("");
  };
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
            const to = userid;
            readMsgRun(to);
          }}
        >
          &lt;
        </a>
        {users[userid].name}
      </p>
      <div className={styles["chat-content"]}>
        {chatmsgs.map((v) => {
          const avatar = `https://shoukailiang-blog.oss-cn-hangzhou.aliyuncs.com/article/${
            users[v.from].avatar
          }.png`;
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
          if (e.target.className === "chat-emoji") {
            return;
          }
          // setShowEmoji(false);
        }}
      >
        <TextArea
          placeholder="请输入内容"
          rows={3}
          onChange={(text) => setText(text)}
          value={text}
        />
        <Space />
        <p
          className={styles["chat-emoji"]}
          onClick={() => {
            setShowEmoji(!showEmoji);
          }}
        >
          😄
        </p>
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
                  <b
                    key={v}
                    title={v}
                    onClick={(e) => {
                      console.log(e.target.title);
                      setText(text + e.target.title);
                    }}
                  >
                    {v}
                  </b>
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
