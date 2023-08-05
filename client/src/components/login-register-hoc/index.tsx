import React from 'react'
export default function LoginRegisterHoc(Comp) {
  return class WarperComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange=this.handleChange.bind(this)
    }
    handleChange(key:string, text:string) {
      // key要加[],不加就变成字符串了
      this.setState({
        [key]: text
      })
    }
    render() {
      return (
        <Comp {...this.props} handleChange={this.handleChange} state={this.state}></Comp>
      )
    }
  }
}