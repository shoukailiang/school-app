import React from 'react';
import { connect } from 'react-redux'
import { getUserList } from '@/redux/chatuser.redux'
import Usercard from '../usercard/usercard'
import '../public-component-css/boss-genius.scss'
@connect(
  state => state.chatuser,
  { getUserList }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    return (
      <div className="boss-genius-container">
        <Usercard userlist2={this.props.userlist}></Usercard>
      </div>
    )
  }
}
export default Genius;