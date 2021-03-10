
import styled from 'styled-components';

const Detail = styled.div`
  position: absolute;
  width: 100%;
  padding: 20px;
  top: 85px;
  // top: -96px;
  right: 0;
  border-radius: 10px;
  z-index: 9;
  flex-direction: column;
  background: rgba(255,255,255,0.96);
  border: 1px solid #EFEFEF;
  box-shadow: 2px 6px 12px 1px rgba(0,0,0,0.12);

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.affirm {
      margin-top: 16px;
    }
  }
  // &:after {
  //   border-left: 6px solid transparent;
  //   border-right: 6px solid transparent;
  //   border-bottom: 6px solid #fff;
  //   content: "";
  //   position: absolute;
  //   left: 50%;
  //   width: 0;
  //   top: -6px;
  // }

  &:before{
    content: "";
    border: 7px solid transparent;
    border-bottom-color: #EFEFEF;
    position: absolute;
    left: 50%;
    top: 0;
    margin-top: -15px;
  }
  &:after{
    content: "";
    border: 7px solid transparent;
    border-bottom-color: white;
    position: absolute;
    top: 0;
    left: 50%;
    margin-top: -14px;
  }
`;

export default Detail;
