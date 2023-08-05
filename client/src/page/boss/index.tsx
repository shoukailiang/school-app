import { DotLoading } from "antd-mobile";
import { getUserListService } from "@/services/user";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { getUserListReducer } from "@/store/chatUserReducer";
import { useDispatch } from "react-redux";
import UserCard from "@/components/userCard";
const Boss = () => {
  const dispatch = useDispatch();
  const {
    data,
    run,
    loading: bossLoading,
  } = useRequest(
    async () => {
      const data = await getUserListService("genius");
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(getUserListReducer(res));
        console.log(res)
      },
    }
  );
  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      {bossLoading ? (
        <DotLoading color="primary" />
      ) : (
        <UserCard userList={data} />
      )}
    </div>
  );
};
export default Boss;
