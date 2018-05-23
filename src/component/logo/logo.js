import React from 'react'
import logoImg from './school-logo.png'
import './logo.scss'
class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt="" />
      </div>
    )
  }
}
export default Logo