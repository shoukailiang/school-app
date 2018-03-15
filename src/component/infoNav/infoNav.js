import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
class InfoNav extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }
  render() {
    const H1 = styled.h1`
      text-align: center;
      padding:10px;
      border-bottom:2px solid #ccc;
      >span{
        color:#ccc;
      }
    `;
    return (
      <React.Fragment>
        <H1>
          <span className="aaa">{this.props.name}信息完善页面</span>
        </H1>
      </React.Fragment>
    )
  }
}
export default InfoNav;