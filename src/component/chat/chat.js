import React from 'react'
import { Button, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { sendMsg, getMessageList, recvMsg,readMsg } from '@/redux/chat.redux'
import { getChatId } from '@/util'
import './chat.scss'

@connect(
  state => state,
  { sendMsg, getMessageList, recvMsg,readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
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
  // 离开这个路由，来发起请求read
  componentWillUnmount() {
    // 我发送给谁to
    const to = this.props.match.params.user
    // 消息列表点进去后修改消息数目
    this.props.readMsg(to)
  }
  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }
  handleSend() {
    /* socket.emit('sendmsg', { text: this.state.text }) */
    // 从谁发出去
    const from = this.props.user._id
    // 谁接收
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: ''
    })
  }
  render() {
    // console.log(this.props)
    // 表情
    const emoji = '😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      // filter 防止会有两个空格
      .filter(v => v)
    // 去重
    const emoji2 = Array.from(new Set(emoji))
    // 把类数组转化成数组
    const userid = this.props.match.params.user
    const user = this.props.chat.users
    const chatid = getChatId(userid, this.props.user._id)// 别人的和自己的id
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    if (!user[userid]) {
      return null
    }
    return (
      <div className="chat-container">
        <p className="chat-container-username"><a onClick={() => {
          this.props.history.goBack()
        }}>&lt;&lt;&lt;</a>{user[userid].name}</p>
        <div className="chat-content" ref="content">
          {chatmsg.map(v => {
            const avatar = require(`../avatarSelector/images/${user[v.from].avatar}.png`)
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
        <div className="chat-message"
          onClick={(e) => {
            if (e.target.className === 'chat-emoji' || e.target.className === 'ant-col-2') {
              return
            }
            this.setState({
              showEmoji: false
            })
          }}
        >
          <textarea className="chat-textarea" onChange={this.handleChange.bind(this, 'text')} value={this.state.text}></textarea>
          <span className="chat-emoji" aria-label="" role="img"
            onClick={() => {
              this.setState({
                showEmoji: !this.state.showEmoji
              })
            }}
          >😄</span>
          <Button type="primary" className="chat-button" onClick={this.handleSend.bind(this)}>发送</Button>
          {this.state.showEmoji ? <div className="chat-emoji-container">
            <Row type="flex">
              {emoji2.map(v => {
                return <Col span={2} key={v} title={v}
                  onClick={(e) => {
                    this.setState({
                      text: this.state.text + e.target.title
                    })
                  }}
                >{v}</Col>
              })}
            </Row>
          </div> : null}

        </div>
      </div>
    )
  }
}
export default Chat