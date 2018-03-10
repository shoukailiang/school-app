import React from 'react';
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { update } from '@/redux/user.redux'
import InfoNav from '@/component/infoNav/infoNav'
import AvatarSelector from '@/component/avatarSelector/avatarSelector'
import '../bossinfo-geniusinfo.scss'
const { TextArea } = Input;
@connect(
  state => state.user,
  { update }
)
class Bossinfo extends React.Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      company: "",
      money: "",
      desc: "",
      avatar: ""
    }
  }
  handleChange(key, e) {
    this.setState({
      [key]: e.target.value
    })
  }
  SelectAvatar(v) {
    this.setState({
      avatar: v
    })
  }
  render() {
    const redirect = this.props.redirectTo;
    const path = this.props.location.pathname
    return (
      <React.Fragment>
        {/* 这边的跳转需要判断一下，不然从login或者register跳转过来的话，又会执行这条命令，就又跳转了一遍相同的，会报一个warn */}
        {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
        <InfoNav name="boss" />
        <AvatarSelector SelectAvatar={this.SelectAvatar.bind(this)} />
        <div className="info-container">
          <h2>请输入你要招聘职位的要求：</h2>
          <Input placeholder="招聘岗位" size="large" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
          <Input placeholder="公司名称" size="large" value={this.state.company} onChange={this.handleChange.bind(this, "company")} />
          <Input placeholder="薪资范围" size="large" value={this.state.money} onChange={this.handleChange.bind(this, "money")} />
          <TextArea placeholder="招聘要求" autosize={{ minRows: 3 }} value={this.state.desc} onChange={this.handleChange.bind(this, "desc")} />
          <Button size="large" className="btn" onClick={() => {
            this.props.update(this.state)
          }}>保存</Button>
        </div>
      </React.Fragment>
    )
  }
}
export default Bossinfo;