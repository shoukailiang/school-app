import useGetUserInfo from "@/hooks/useGetUserInfo";
import { logoutReducer } from "@/store/userReducer";
import { Avatar, Button, Divider } from "antd-mobile";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
const PersonCenter = () => {
  const { user, type, avatar, title, desc, company, money } = useGetUserInfo();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logoutHander = () => {
    dispatch(logoutReducer());
    nav("/login");
  };
  return (
    <div className={styles.container}>
      <Avatar
        src={`https://shoukailiang-blog.oss-cn-hangzhou.aliyuncs.com/article/${avatar}.png`}
        style={{ "--size": "64px" }}
      />
      <p>用户昵称：{user}</p>
      <p>期望岗位：{title}</p>
      <b>{type === "boss" ? "职位要求" : "个人简介"}</b>
      {desc.split("\n").map((v) => (
        <p key={v}>{v}</p>
      ))}
      {type === "boss" && (
        <>
          <b>公司名称：{company}</b>
          <b>薪资：{money}</b>
        </>
      )}

      <Button color="danger" onClick={logoutHander}>
        退出登录
      </Button>
      <Divider />
    </div>
  );
};

export default PersonCenter;
