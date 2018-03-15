import React from 'react';
import { connect } from 'react-redux'
import { Card, Button, Modal } from 'antd';
import { Redirect } from 'react-router-dom'
import BrowserCookie from 'browser-cookies'
import { logoutSubmit } from '@/redux/user.redux'
import './user.scss'
@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  logout() {
    const confirm = Modal.confirm;
    const This = this;
    confirm({
      title: '你确定要退出登录吗?',
      content: '',
      okText: '确定',
      okType: 'info',
      cancelText: '返回',
      onOk() {
        BrowserCookie.erase('userid');
        This.props.logoutSubmit()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    const { Meta } = Card;
    const props = this.props;
    return props.user ? (
      <div className="user-container">
        <Card
          style={{ margin: "auto", textAlign: "center" }}
        >
          <img src={require(`../avatarSelector/images/${props.avatar}.png`)} alt="" />
          <Meta
            title={`用户昵称：${props.user}`}
            description={
              <div>
                <b>{props.type === 'boss' ? "职位要求" : "个人简介"}</b>：
                {props.desc.split("\n").map(v => <p key={v}>{v}</p>)}
              </div>}
          />
          <Button type="primary" onClick={this.logout.bind(this)}>退出登录</Button>
        </Card>
      </div >
    ) : <Redirect to={props.redirectTo}></Redirect>
  }
}
export default User;
