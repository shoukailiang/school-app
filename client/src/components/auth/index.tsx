import { useEffect } from "react";
import { getUserInfoService } from "@/services/user";
import { loadDataReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const publicList = ["/register", "/login"];
  useEffect(() => {
    if (publicList.indexOf(location.pathname) !== -1) {
      return null;
    }
    // 加载用户信息
    getUserInfoService()
      .then((res: any) => {
        // 导航到主页
        navigate("/me");
        dispatch(loadDataReducer(res as any));
        Toast.show("登陆成功");
      })
      .catch((err) => {
        console.log(err);
        Toast.show("获取信息失败");
        navigate("/login");
      });
  }, []);
  return null;
};
export default Auth;
