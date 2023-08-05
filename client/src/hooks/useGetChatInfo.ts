import { useSelector } from "react-redux";
import type { StateType } from "@/store";
import { ChatStateType } from "@/store/chatReducer";

const useGetChatInfo = () => {
  const { users ,msgs, chatmsg, unread } =
    useSelector<StateType>((state) => state.chat) as ChatStateType;
  return { users ,msgs, chatmsg, unread };
};

export default useGetChatInfo;
