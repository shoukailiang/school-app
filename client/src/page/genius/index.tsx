import { DotLoading } from "antd-mobile";
import { getUserListService } from "@/services/user";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { getUserListReducer } from "@/store/chatUserReducer";
import { useDispatch } from "react-redux";
import UserCard from "@/components/userCard";
const Genius = () => {
  const dispatch = useDispatch();
  const {
    data,
    run,
    loading: geniusLoading,
  } = useRequest(
    async () => {
      const data = await getUserListService("genius");
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(getUserListReducer(res));
      },
    }
  );
  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      {geniusLoading ? (
        <DotLoading color="primary" />
      ) : (
        <UserCard userList={data} />
      )}
    </div>
  );
};
export default Genius;
