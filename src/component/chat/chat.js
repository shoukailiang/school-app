import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { sendMsg, getMessageList, recvMsg } from '@/redux/chat.redux'
import { getChatId } from '@/util';
import './chat.scss'

@connect(
  state => state,
  { sendMsg, getMessageList, recvMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    /* //监听后端广播到全局 的信息
    socket.on('recvmsg', (data) => {
      console.log(data)
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    }) */
    if (!this.props.chat.chatmsg.length) {
      this.props.getMessageList()
      this.props.recvMsg()
    }
  }
  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }
  handleSend() {
    /* socket.emit('sendmsg', { text: this.state.text }) */
    // 从谁发出去
    const from = this.props.user._id;
    // 谁接收
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: ''
    })
  }
  render() {
    // console.log(this.props)
    const userid = this.props.match.params.user;
    const user = this.props.chat.users;
    const chatid = getChatId(userid, this.props.user._id)// 别人的和自己的id
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    if (!user[userid]) {
      return null;
    }
    return (
      <div className="chat-container">
        <p className="chat-container-username">{user[userid].name}</p>
        <div className="chat-content" ref="content">
          {chatmsg.map(v => {
            const avatar = require(`../avatarSelector/images/${user[v.from].avatar}.png`);
            return v.from === userid
              ? <p key={v._id} className="chat-other">
                <img src={avatar} alt="" />
                {v.content}
              </p>
              : <p key={v._id} className="chat-me">
                {v.content}
                <img src={avatar} alt="" />
              </p>
          })}
        </div>
        <div className="chat-message">
          <textarea className="chat-textarea" onChange={this.handleChange.bind(this, 'text')} value={this.state.text}></textarea>
          <Button type="primary" className="chat-button" onClick={this.handleSend.bind(this)}>发送</Button>
        </div>
      </div>
    )
  }
}
export default Chat;