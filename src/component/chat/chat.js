import React from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { sendMsg, getMessageList, recvMsg } from '../../redux/chat.redux'
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
    this.props.getMessageList()
    this.props.recvMsg()
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
    return (
      <div className="chat-container">
        <div className="chat-contnet"></div>
        <div className="chat-message">
          <textarea className="chat-textarea" onChange={this.handleChange.bind(this, 'text')} value={this.state.text}></textarea>
          <Button type="primary" className="chat-button" onClick={this.handleSend.bind(this)}>发送</Button>
        </div>
      </div>
    )
  }
}
export default Chat;