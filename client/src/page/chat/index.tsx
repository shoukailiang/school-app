import { useRequest } from "ahooks";
import {
  getMessageListService,
  recvMsgService,
  readMsgService,
  sendMsgService,
} from "@/services/chat";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useEffect, useRef, useState } from "react";
import { getMsgListReducer, msgReadReducer } from "@/store/chatReducer";
import { useDispatch } from "react-redux";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import styles from "./index.module.scss";
import { Button, Space, TextArea } from "antd-mobile";
import { useParams, useNavigate } from "react-router-dom";
import { getChatId } from "@/utils";
const Chat = () => {
  const emojiBoxRef = useRef(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { chatmsg, users } = useGetChatInfo();
  const { _id } = useGetUserInfo();
  const { run } = useRequest(
    async () => {
      const data = await getMessageListService();
      return data;
    },
    {
      manual: true,
      onSuccess(res) {
        dispatch(getMsgListReducer({ ...res, userid: _id }));
      },
    }
  );

  const { run: readMsgRun } = useRequest(
    async (to) => {
      const data = await readMsgService(to);
      return { num: data, from: to };
    },
    {
      manual: true,
      onSuccess(res) {
        console.log(res);
        dispatch(msgReadReducer({ num: res.num, from: res.from }));
        console.log({ num: res, userid: _id });
      },
      onFinally() {
        nav(-1);
      },
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
  },[]);
  const handleSend = () => {
    const from = _id;
    const to = userid;
    const msg = text;
    sendMsgService({ from, to, msg });
    setText("");
    // 表情框消失
    setShowEmoji(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (emojiBoxRef.current && !emojiBoxRef.current.contains(e.target as Node)) {
      setShowEmoji(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = (emoji: string) => {
    setText(text + emoji);
  }
  // 表情
  const emoji =
    "😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      // filter 防止会有两个空格
      .filter((v) => v);
  // 去重
  const emoji2 = Array.from(new Set(emoji));
  if(!userid) return null;
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
        className={styles["chat-message"]}>
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
          <div className={styles["chat-emoji-container"]} ref={emojiBoxRef}>
            <div>
              {emoji2.map((v) => {
                return (
                  <span
                    className={styles.emoji}
                    key={v}
                    title={v}
                    onClick={() => handleEmojiClick(v)}
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
