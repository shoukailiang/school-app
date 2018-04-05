import React from 'react'
import { Card, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import './usercard.scss'
@withRouter
class Usercard extends React.Component {
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <React.Fragment>
        {this.props.userlist2.map(v => {
          return (
            // 判断必须要有头像否侧不渲染
            v.avatar ?
              <Card key={v._id} title={v.title} extra={v.user} style={{ width: 500 }}>
                <img src={require(`../avatarSelector/images/${v.avatar}.png`)} alt="" />
                {v.company ? <div>公司: {v.company}</div> : null}
                {/* 若有换行符，进行一行一行显示 */}
                <b>{v.type === 'boss' ? '要求：' : '个人介绍'}</b>
                {v.desc.split('\n').map((v, index) => {
                  return <p key={v + index}>{v}</p>
                })}
                {v.money ? <div>薪资: {v.money}</div> : null}
                <p className="user-char-chat-with-p" onClick={this.handleClick.bind(this, v)}>
                  <Icon type="message" />
                  联系他（她）
                </p>
              </Card>
              : null
          )
        })}
      </React.Fragment>
    )
  }
}
export default Usercard