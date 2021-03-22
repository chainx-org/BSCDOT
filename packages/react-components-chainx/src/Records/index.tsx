import React from 'react';
import styled from 'styled-components';
import { TransferRecords } from './TransferRecords';
import { RedeemRecords }  from './RedeemRecords';
import { PublishRedeem } from './PublishRecords';
import useTokenTransferList from '@polkadot/app-accounts-chainx/useTransferList';
import { AccountContext } from '@polkadot/react-components-chainx/AccountProvider';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  border: none;
  .isBasic {
    font-size: 20px;
    color: #444C5E;
    padding: 15px 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 1px solid #EFEFEF;
  }
  // .pdotCon {
  //   &::-webkit-scrollbar {    
  //       width: 5px;
  //       background: transparent;
  //   }
  //   &::-webkit-scrollbar-thumb { 
  //       background: #6F7C7C;
  //       border-radius: 2.5px;
  //   }
  // }
`;


interface RecordsProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}


export function Records({ children, className = '', title }: RecordsProps): React.ReactElement<RecordsProps> {

  // const { currentAccount } = useContext(AccountContext);

  const allrecord = useTokenTransferList();
  const publishRecord = allrecord?.PublishRecords
  const publishlen = allrecord?.PublishRecords.length
  const transfersRecord = allrecord?.Transfers
  const transferslen = allrecord?.Transfers.length
  const redreemRecord = allrecord?.RedreemRecords
  const redreemlen = allrecord?.RedreemRecords.length
  
  return (
    <Wrapper>
      <p className={`${className} isBasic  `}>{title}</p>
      <div className='pdotCon'>
        {
          title === '转账记录'? <TransferRecords record={transfersRecord} recordlen={transferslen} arrows={false} /> :
          title === '发行记录'? <PublishRedeem record={publishRecord} recordlen={publishlen} arrows={true} />: 
          title === '赎回记录'? <PublishRedeem record={redreemRecord} recordlen={redreemlen} arrows={true} /> : null
        }
      </div>
      {children}
    </Wrapper>
  );
}
