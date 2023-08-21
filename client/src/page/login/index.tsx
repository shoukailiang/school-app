import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import LoginRegisterHoc from "@/components/login-register-hoc";
import Logo from "@/components/logo";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { loginService } from "@/services/user";
import { loginReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
import { getRedirectPath } from "@/utils";
type PropsType = {
  state: {
    username: string;
    password: string;
  };
  handleChange: (key: string, value: string) => void;
};
const Login: FC<PropsType> = (props: PropsType) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const backRegister = () => {
    navigate("/register");
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
        dispatch(loginReducer(res));
        const path = getRedirectPath({ type: res.type, avatar: res.avatar });
        navigate(path);
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
