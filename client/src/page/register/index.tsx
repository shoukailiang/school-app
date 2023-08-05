import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Radio, Space } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import LoginRegisterHoc from "@/components/login-register-hoc";
import Logo from "@/components/logo";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { registerService } from "@/services/user";
import { registerReducer } from "@/store/userReducer";
import { useDispatch } from "react-redux";
const Register = (props: any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const backLogin = () => {
    navigate("/login");
  };

  // 注册
  const { run: register, loading: registerLoading } = useRequest(
    async () => {
      const { username, password,type } = props.state;
      const data = await registerService(username, password,type);
      return data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        dispatch(registerReducer(res as any));
        if(res.type === "genius"){
          navigate("/geniusinfo");
        }else{
          navigate("/bossinfo");
        }
      },
    }
  );

  const handleRegister = () => {
    // 判断props.state中是否有username和password
    if (!props.state.username || !props.state.password) {
      return;
    }
    register();
  };
  return (
    <div className={styles.container}>
      <Logo />
      <div className={styles.main}>
        <h1>注册</h1>
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
          <Form.Item>
            <Radio.Group defaultValue="1" onChange={(text)=>props.handleChange("type",text)}>
              <Space direction="horizontal">
                <Radio value="boss">招聘者</Radio>
                <Radio value="genius">求职者</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Space />
          <Form.Item>
            <Button
              block
              type="submit"
              color="primary"
              size="large"
              onClick={handleRegister}
              loading={registerLoading}
            >
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            <a onClick={backLogin}>返回登录</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginRegisterHoc(Register);
