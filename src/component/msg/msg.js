import React from 'react'
import { List } from 'antd'
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
    const userid = this.props.user._id
    console.log(chatList)

    return (
      <React.Fragment>
        <div className="msg-container">
          <List
            itemLayout="horizontal"
            dataSource={chatList}
            // ant-design帮你遍历了
            renderItem={item => {
              // 用来获取发过来的最后一条信息
              const lastItem = this.getLast(item)
              const targetId = userid === item[0].from ? item[0].to : item[0].from
              const name = this.props.chat.users[targetId] ? this.props.chat.users[targetId].name : ''
              const avatar = this.props.chat.users[targetId] ? this.props.chat.users[targetId].avatar : ''
              // 在右侧的数量
              const unreadNum = item.filter(v => !v.read && v.to === userid).length
              return (
                <List.Item onClick={() => {
                  // 点击聊天项跳转到聊天页面
                  this.props.history.push(`/chat/${targetId}`)
                }}>
                  <List.Item.Meta
                    avatar={<img src={require(`../avatarSelector/images/${avatar}.png`)} alt="avatar" />}
                    title={<span>用户名：<b>{name}</b></span>}
                    description={<span>内容：{lastItem.content}</span>}
                  />
                  {unreadNum ? <div className="msg-circle">{unreadNum}</div> : null}
                </List.Item>
              )
            }}
          />
        </div>
      </React.Fragment >
    )
  }
}
export default Msg