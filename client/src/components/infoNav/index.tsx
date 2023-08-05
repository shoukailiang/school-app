import styled from "styled-components";
const H1 = styled.h1`
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #ccc;
  > span {
    color: #ccc;
  }
`;
const InfoNav = ({ name }) => {
  return (
    <>
      <H1>
        <span className="aaa">{name}信息完善页面</span>
      </H1>
    </>
  );
};

export default InfoNav;
