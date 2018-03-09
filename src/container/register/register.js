import React from 'react';
import { Form, Icon, Input, Button, Radio,Alert } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import BackgroundCarousel from '../../component/carousel/LRcarousel'
import '../login-register.scss'
import { register } from '../../redux/user.redux'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repwd: '',
      type: 'boss'
    }
  }
  backLogin() {
    this.props.history.push('/login')
  }
  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    })
  }
  handleRegister() {
    this.props.register(this.state)
  }
  render() {
    return (
      <React.Fragment>
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <BackgroundCarousel />
        {this.props.msg ? <Alert message={this.props.msg} banner className="error-msg" type="error" /> : ''}
        <div className="login-register-container">
          <Form className="login-form">
            <Logo />
            <h2>注册</h2>
            <FormItem>
              <Input prefix={<Icon type="user" />}
                placeholder="用户名" size="large"
                value={this.state.user}
                onChange={this.handleChange.bind(this, 'user')}
              />
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" />}
                type="password"
                placeholder="密码"
                size="large"
                value={this.state.pwd}
                onChange={this.handleChange.bind(this, 'pwd')}
              />
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" />}
                type="password"
                placeholder="确认密码"
                size="large"
                value={this.state.repwd}
                onChange={this.handleChange.bind(this, 'repwd')}
              />
            </FormItem>
            <RadioGroup onChange={this.handleChange.bind(this, 'type')} style={{ marginBottom: '10px' }}>
              <Radio value='boss'
                checked={this.state.type === 'boss'}
              >Boss
              </Radio>
              <Radio
                value='genius'
                checked={this.state.type === 'genius'}
              >牛人</Radio>
            </RadioGroup>
            <Button type="primary" className="login-register-form-button" size="large" onClick={this.handleRegister.bind(this)}>
              注册
            </Button>
            <a onClick={this.backLogin.bind(this)}>
              返回登录
            </a>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}
export default Register;