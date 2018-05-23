import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './navLink.scss'
@withRouter
@connect(
  state => state.chat
)
class NavLink extends React.Component {
  static propsTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
    // 先进行过滤，filter里面为true的会留下来,不会改变元数据
    const data = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <React.Fragment>
        {data.map(v => {
          return (
            <span key={v.path} className="navlink-span" onClick={() => {
              this.props.history.push(v.path)
            }}>
              <img src={v.path === pathname ? require(`./images/${v.icon}-active.png`) : require(`./images/${v.icon}.png`)} alt="" />
              {v.path === '/msg' && this.props.unread !== 0 ? <div className="circle-message"><p>{this.props.unread}</p></div> : null}
              <a style={v.path === pathname ? { color: '#4a9aea' } : {}}>{v.title}</a>
            </span>
          )
        })}
      </React.Fragment>
    )
  }
}
export default NavLink