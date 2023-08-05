import { useSelector } from "react-redux";
import type { StateType } from "@/store";
import { UserStateType } from "@/store/userReducer";

const useGetUserInfo = () => {
  const { user, type, avatar, title, desc, company, money } =
    useSelector<StateType>((state) => state.user) as UserStateType;
  return { user, type, avatar, title, desc, company, money };
};

export default useGetUserInfo;
