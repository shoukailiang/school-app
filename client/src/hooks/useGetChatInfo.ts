import { useSelector } from "react-redux";
import type { StateType } from "@/store";
import { ChatStateType } from "@/store/chatReducer";

const useGetChatInfo = () => {
  const { users , chatmsg, unread } =
    useSelector<StateType>((state) => state.chat) as ChatStateType;
  return { users , chatmsg, unread };
};

export default useGetChatInfo;
