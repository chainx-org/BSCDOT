import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;
`;

export const Title = styled.p`
  font-size: 20px;
  color: #444c5e;
  padding: 15px 20px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 1px solid #efefef;
`;


export const Content = styled.div`
    overflow-y: auto;
    border-radius: 10px;
    &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
    }
    &::-webkit-scrollbar-thumb {
    background: #6f7c7c;
    border-radius: 2.5px;
    }
`;

export const PublishAndRedeem = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    background: #fff;
    padding: 20px 30px 30px;
    font-size: 12px;
    .isConfirm {
        margin-top: 36px !important;
    }
`;

export const TransfersCard = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 30px;
    font-size: 12px;
    .bgcolor {
      background: #F2F3F4;
      border-radius: 4px;
      margin-bottom: 16px;
      input {
        background: #F2F3F4;
        padding: 15px;
        margin-bottom: 0;
        &:focus {
          background: #F2F3F4;
          border: 1px solid #DCE0E2;
        }
      }
    }
    .isConfirm {
      margin-top: 20px !important;
    }
`;


export const AmountAndTip = styled.p`
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 12px;
    color: #6f7c7c;
    text-align: center;
    &.tip {
        margin-bottom: 20px;
    }
`;
export const AmountAndAddress = styled.p`
  margin-bottom: 12px;
  &.amountTit {
    color: #444C5E;
  }
  &.addressTit {
    color: #3F3F3F;
  }
`;

export const RedeemWarn = styled.span`
    display: none;
    position: absolute;
    bottom: 92px;
    left: 50%;
    transform: translate(-50%);
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #de071c;
    line-height: 16px;
    &.isShow {
        display: block !important;
    }
`;

export const Nodata = styled.div`
    min-height: 324px;
    min-width: 636px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    // vertical-align: middle;
    border-radius: 10px;
    border: none;
    font-size: 12px;
    color: #AFB1B4;
    letter-spacing: 0;
    text-align: center;
`;

export const Addressjudge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .iptAddress {
    width: 100%;
  }
  .warning {
    margin: 0 0 16px 20px;
  }
`;