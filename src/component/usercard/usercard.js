import React from 'react';
import { Card } from 'antd';
class Usercard extends React.Component {
  render() {
    return (
      <div>
        {this.props.userlist2.map(v => {
          return (
            // 判断必须要有头像否侧不渲染
            v.avatar ?
              <Card key={v._id} title={v.title} extra={v.user} style={{ width: 500 }}>
                <img src={require(`../avatarSelector/images/${v.avatar}.png`)} alt="" />
                {v.company ? <div>公司: {v.company}</div> : null}
                {/* 若有换行符，进行一行一行显示 */}
                <b>要求：</b>
                {v.desc.split('\n').map((v, index) => {
                  return <p key={v + index}>{v}</p>
                })}
                {v.money ? <div>薪资: {v.money}</div> : null}
              </Card>
              : null
          )
        })}
      </div>
    )
  }
}
export default Usercard;