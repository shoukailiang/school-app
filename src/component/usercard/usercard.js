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
                <Card className="partner" title={`职位:${v.title}`} extra={`${v.user}`} key={v.user}>
                  <div className="niuren-left">
                    <img src={require(`../avatarSelector/images/${v.avatar}.png`)} alt="" />
                    <p className="user-char-chat-with-p" onClick={this.handleClick.bind(this, v)}>
                      <Icon type="message" />联系他（她）
                    </p>
                  </div>
                  <div className="niuren-right">
                    {v.company ? <div>地点: {v.company}</div> : null}
                    {/* 若有换行符，进行一行一行显示 */}
                    <b>{v.type === 'boss' ? '要求：' : '个人介绍'}</b>
                    {v.desc.split('\n').map((v, index) => {
                      return <p key={v + index}>{v}</p>
                    })}
                    {v.money ? <div>薪资: {v.money}</div> : null}
                  </div>
                </Card>
              : null
          )
        })}
      </React.Fragment>
    )
  }
}
export default Usercard