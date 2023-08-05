import { useEffect } from "react";
import { getUserInfoService, loginService } from "@/services/user";
import { loginReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // 加载用户信息
      getUserInfoService()
        .then((res: any) => {
          // 导航到主页
          navigate("/");
          dispatch(loginReducer(res as any));
          Toast.show("登陆成功");
        })
        .catch((err) => {
          console.log(err);
          Toast.show("获取信息失败");
        });
  }, []);
  return null;
};
export default Auth;
