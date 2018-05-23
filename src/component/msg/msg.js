import React from 'react'
import { connect } from 'react-redux'
import "./msg.scss"
@connect(
  state => state
)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render() {
    const msgGroup = {}
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    // 将消息后发的放在前面
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })


    return (
      <React.Fragment>
        <div className="msg-container">
          {chatList.map(v => {
            // 用来获取发过来的最后一条信息
            const lastItem = this.getLast(v)
            const targetId = userid === v[0].from ? v[0].to : v[0].from
            if (!userinfo[targetId]) {
              return null
            }
            // 在右侧的数量
            const unreadNum = v.filter(item => !item.read && item.to === userid).length
            return (
              <div
                className="msg-item"
                key={lastItem._id}
                onClick={() => {
                  // 点击聊天项跳转到聊天页面
                  this.props.history.push(`/chat/${targetId}`)
                }}>
                <div className="msg-name-avatar">
                  <img src={require(`../avatarSelector/images/${userinfo[targetId].avatar}.png`)} alt="avatar" />
                  <b>{userinfo[targetId].name}</b>
                </div>
                <p className="msg-content">内容：{lastItem.content}</p>
                {unreadNum ? <span className="msg-circle">{unreadNum}</span> : null}
              </div>
            )
          })}
        </div>
      </React.Fragment >
    )
  }
}
export default Msg