
import styled from 'styled-components';

export const Wrapper = styled.div`
  &.overflow {
    max-height: 324px;
    overflow-y: auto;
    &::-webkit-scrollbar {    
      width: 5px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb { 
      background: #6F7C7C;
      border-radius: 2.5px;
    }
  }
  &.normal {
    max-height: 324px;
  }
  .line {
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #EFEFEF;
    padding: 15px 20px;
    
    header,
    .account {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header {
      margin-bottom: 8px;
      .txNum {
        font-size: 11px;
        color: #6F7C7C;
        .txNums {
          font-size: 12px;
          color: #444C5E;
          margin-left: 8px;
        }
      }
      .pending, .reslove, .inout {
        font-size: 14px;
        text-align: right;
      }
      .pending, .inout {
        color: #51ABAD;
      }
      .reslove {
        color: #444C5E;
      }
    }
    .account {
      .amount {
        font-size: 14px;
        font-weight: 540;
        color: #6F7C7C;
      }
      .address {
        font-size: 12px;
        line-height: 16px;
      }
      .arrow {
        width: 15px;
        height: 10px;
      }
    }
  }
`;

export const Detail = styled.div`
  &.detail:not(.lineDetail0) {
    position: absolute;
    width: 100%;
    padding: 20px;
    top: -50px;
    right: 0;
    border-radius: 10px;
    z-index: 9;
    flex-direction: column;
    background: rgba(255,255,255,0.96);
    border: 1px solid #EFEFEF;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.12);

    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.affirm {
        margin-top: 16px;
      }
    }
    &:after{
      content: "";
      border: 7px solid transparent;
      border-top-color: white;
      position: absolute;
      bottom: -14px;
      left: 50%;
      margin-top: -16px;
    }
  }
  &.lineDetail0 {
    position: absolute;
    width: 100%;
    padding: 20px;
    top: 70px;
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

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

