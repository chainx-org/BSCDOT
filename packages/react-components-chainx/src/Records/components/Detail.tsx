
import styled from 'styled-components';

export const Detail = styled.div`
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

export const Label = styled.span`
  font-size: 12px;
  color: #6F7C7C;
  letter-spacing: 0.2px;
  line-height: 16px;
`;


export const LinkWrapper = styled.div`
  &:hover {
    color: #6F7C7C;
    opacity: 0.56;
    // img.link {
    //   display: none;
    // }
    // img.link-highlight {
    //   display: inline-block;
    // }
  }
  opacity: 1;
  font-size: 12px;
  color: #6F7C7C;
  letter-spacing: 0.2px;
  text-align: right;
  line-height: 16px;
  // img {
  //   margin-left: 6px;
  // }
  // img.link-highlight {
  //   display: none;
  // }
`;

export const LinkWrap = styled.div`
  &:hover {
    color: #57B5D9;
    opacity: 0.56;
    // img.link {
    //   display: none;
    // }
    // img.link-highlight {
    //   display: inline-block;
    // }
  }
  opacity: 1;
  font-size: 12px;
  color: #57B5D9;
  letter-spacing: 0.2px;
  text-align: right;
  line-height: 16px;
  // img {
  //   margin-left: 6px;
  // }
  // img.link-highlight {
  //   display: none;
  // }
`;


