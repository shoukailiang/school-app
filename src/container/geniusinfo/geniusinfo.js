import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import InfoNav from '@/component/infoNav/infoNav'
import { update } from '@/redux/user.redux'
import AvatarSelector from '@/component/avatarSelector/avatarSelector'
import '../bossinfo-geniusinfo.scss'
const { TextArea } = Input;
@connect(
  state => state.user,
  { update }
)
class Geniusinfo extends React.Component {
  static propTypes = {
    update: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      title: "",
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
    const path = this.props.location.pathname;
    return (
      <React.Fragment>
        {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
        <InfoNav name="genius"></InfoNav>
        <AvatarSelector SelectAvatar={this.SelectAvatar.bind(this)}></AvatarSelector>
        <div className="info-container">
          <h2>请输入您的信息：</h2>
          <Input placeholder="招聘岗位" size="large" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
          <TextArea placeholder="个人简介" autosize={{ minRows: 3 }} value={this.state.desc} onChange={this.handleChange.bind(this, "desc")} />
          <Button size="large" className="btn" onClick={() => {
            this.props.update(this.state)
          }}>保存</Button>
        </div>
      </React.Fragment>
    )
  }
}
export default Geniusinfo;