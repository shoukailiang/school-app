import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Alert } from 'antd'
import { Redirect } from 'react-router-dom'
import Logo from '../../../src/component/logo/logo'
import { login } from '../../redux/user.redux'
import BackgroundCarousel from '../../../src/component/carousel/LRcarousel'
import LoginRegisterHoc from '../../../src/component/login-register-hoc/login-register-hoc'
import '../login-register.scss'
const FormItem = Form.Item
@connect(
  state => state.user,
  { login }
)
@LoginRegisterHoc
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.returnRegister=this.returnRegister.bind(this)
  }
  returnRegister() {
    this.props.history.push('/register')
  }

  handleLogin() {
    //来自高阶组件的state
    this.props.login(this.props.state)
  }
  render() {
    return (
      <React.Fragment>
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <BackgroundCarousel />
        {this.props.msg ? <Alert message={this.props.msg} banner className="error-msg" type="error" /> : ''}
        <div className="login-register-container">
          <Logo />
          <h2>登录</h2>
          <Form className="login-form">
            <FormItem>
              <Input prefix={<Icon type="user" />}
                value={this.props.state.user}
                placeholder="用户名"
                size="large"
                onChange={this.props.handleChange.bind(this, 'user')}  // 来自高阶组件的函数
              />
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" size="large"
                value={this.props.state.pwd}
                onChange={this.props.handleChange.bind(this, 'pwd')}
              />
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-register-form-button" size="large"
              onClick={this.handleLogin}>
              登录
            </Button>
            <Button type="primary" className="login-register-form-button" size="large"
              onClick={this.returnRegister}>
              注册
            </Button>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}
export default Login