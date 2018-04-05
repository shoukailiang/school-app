// 一个简单的高阶组件
import React from 'react'
export default function LoginRegisterHoc(Comp) {
  return class WarperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
    handleChange(key, event) {
      // key要加[],不加就变成字符串了
      this.setState({
        [key]: event.target.value
      })
    }
    render() {
      return (
        <Comp {...this.props} handleChange={this.handleChange.bind(this)} state={this.state}></Comp>
      )
    }
  }
}