import React from 'react'
import { Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import './avatarSelector.scss'
class AvatarSelector extends React.Component {
  static propTypes = {
    SelectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      icon: "",
      text: "",
      clientWidth: document.body.clientWidth
    }
  }
  handleSelect(value) {
    this.setState(value)
    this.props.SelectAvatar(value.text)
  }
  render() {
    const imgList =
      'waiter,worker,nurse,robot,technology,police,service,courier,student,grandma,grandpa,national,man,man2,girl,girl2,soldier,doctor,sportsman,criminal'
        .split(',').map((v) => ({
          icon: require(`./images/${v}.png`),
          text: v,
        }))
    const Header = this.state.icon
      ? <div className="avatar-selector-header">你选择的头像是：<img src={this.state.icon} alt="" /></div>
      : <div className="avatar-selector-header">请选择头像</div>
    return (
      <div className="avatar-selector-container">
        {Header}
        <Row>
          <div className="avatar-selector-ImgContainer">
            {
              this.state.clientWidth > 1023
              ?
                imgList.map((value, index) => {
                  return (
                    <Col span={3} key={value.text} className="avatar-selector-col">
                      <img src={value.icon} alt="" onClick={this.handleSelect.bind(this, value)} />
                    </Col>
                  )
                })
              :
                imgList.map((value, index) => {
                  return (
                    <Col span={6} key={value.text} className="avatar-selector-col">
                      <img src={value.icon} alt="" onClick={this.handleSelect.bind(this, value)} />
                    </Col>
                  )
                })
            }
          </div>
        </Row>
      </div>
    )
  }
}
export default AvatarSelector
