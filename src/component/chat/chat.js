import React from 'react'
import { Button } from 'antd'
import io from 'socket.io-client'
// 由于跨域了所以要写上
import './chat.scss'
const socket = io("ws://localhost:9999")
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    socket.on('recvmsg', (data) => {
      console.log(data)
      this.setState({
        msg: [...this.state.msg, data.text]
      })
    })
  }
  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }
  handleSend() {
    socket.emit('sendmsg', { text: this.state.text })
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