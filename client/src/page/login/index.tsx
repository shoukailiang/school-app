import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import LoginRegisterHoc from "@/components/login-register-hoc";
import Logo from "@/components/logo";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { getUserInfoService,loginService } from "@/services/user";
import { loginReducer } from "@/store/userReducer";
import { useDispatch } from 'react-redux'
const Login = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ username: '', nickname: '' })
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const backRegister = () => {
    navigate("/register");
  };

  // 加载用户信息
  const loadUserInfo = () => {
    getUserInfoService()
      .then((res:any) => {
        // 导航到主页
        navigate("/");
        setUserInfo(res as any);
        dispatch(loginReducer(res as any));
        Toast.show("登陆成功");
      })
      .catch((err) => {
        console.log(err);
        Toast.show("获取信息失败");
      });
  };

  // 登陆
  const { run: login, loading: loginLoading } = useRequest(
    async () => {
      const { username, password } = props.state;
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        Toast.show("登录成功");
        loadUserInfo();
      },
    }
  );

  const handleLogin = () => {
    // 判断props.state中是否有username和password
    if (!props.state.username || !props.state.password) {
      return;
    }
    login();
  };
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.main}>
        <h1>登录</h1>
        <Form layout="horizontal">
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "用户名不能为空" }]}
          >
            <Input
              placeholder="请输入用户名"
              onChange={(text) => props.handleChange("username", text)}
              clearable
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "密码不能为空" }]}
            extra={
              <div className={styles.eye}>
                {!visible ? (
                  <EyeInvisibleOutline onClick={() => setVisible(true)} />
                ) : (
                  <EyeOutline onClick={() => setVisible(false)} />
                )}
              </div>
            }
          >
            <Input
              placeholder="请输入密码"
              clearable
              type={visible ? "text" : "password"}
              onChange={(e) => props.handleChange("password", e)}
            />
          </Form.Item>
          <Space />
          <Form.Item>
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              onClick={handleLogin}
              loading={loginLoading}
            >
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <a onClick={backRegister}>返回注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginRegisterHoc(Login);
