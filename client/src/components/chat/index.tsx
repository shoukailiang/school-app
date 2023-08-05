import { useRequest } from "ahooks";
import { getMessageListService } from "@/services/chat";
import useGetChatInfo from "@/hooks/useGetChatInfo";
import { useEffect } from "react";
import { getMsgListReducer } from "@/store/chatReducer";
import { useDispatch } from "react-redux";
const Chat = () => {
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
        console.log(res)
        dispatch(getMsgListReducer(res));
      },
    }
  );
  useEffect(() => {
    if (chatmsg.length == 0) {
      run();
    }
  }, []);
  // 表情
  const emoji =
    "😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 "
      .split(" ")
      // filter 防止会有两个空格
      .filter((v) => v);
  // 去重
  const emoji2 = Array.from(new Set(emoji));
  return <div>Chat</div>;
};

export default Chat;
