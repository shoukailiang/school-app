import React from 'react'
import { Carousel } from 'antd'
import './LRcarousel.scss'
class LRcarousel extends React.Component {
  constructor(props) {
    super(props)
    this.handleHeight = this.handleHeight.bind(this)
    this.state = {
      windowHeight: document.documentElement.clientHeight
    }
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleHeight)
  }
  handleHeight() {
    const screenHeight = document.documentElement.clientHeight
    this.setState({
      windowHeight: screenHeight
    })
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleHeight)
  }
  render() {
    var images = [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515580828292&di=cdd118fd749477393912c015e1030789&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151101%2Ftooopen_sy_147082197734.jpg',
      'http://imgstore.cdn.sogou.com/app/a/100540002/435825.jpg',
      'http://fd.topitme.com/d/02/ec/1107599134f8aec02do.jpg',
      'http://www.wmpic.me/wp-content/uploads/2014/03/2014030314353773.jpg'
    ]
    const style = { height: this.state.windowHeight, width: '100%' }
    return (
      <Carousel effect="fade" autoplay>
        {images.map(function (value, index) {
          return <img key={index} style={style} alt="bg" src={value}></img>
        })}
      </Carousel>
    )
  }
}
export default LRcarousel