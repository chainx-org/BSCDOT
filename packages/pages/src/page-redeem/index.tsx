import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import PublishAndRedeemCard from '../components/PdotCards/PublishAndRedeemCard';
import { StatusContext } from '@polkadot/react-components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo } from '@polkadot/pages/helper/helper';
import { bridgeAddress, createDepositTransactionParameters, erc20_minter_contract } from '../contract';
import BigNumber from 'bignumber.js';

interface Props {
  className?: string;
}

export default function RedeemContent({className}: Props): React.ReactElement<Props> {
  const {hasAccounts, currentAccount} = useContext(PolkadotAccountsContext);
  const {platonAccount, hasPlatonAccount, RedeemRecords} = useContext(PlatonAccountsContext);
  const redeemLength = RedeemRecords.length;
  const [amount, setAmount] = useState<string>('');
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'redeem'} as ActionStatus;

  const redeem = () => {
      if (platonAccount && amount) {
        try {
          const amountToBigNumber: BigNumber = (new BigNumber(amount)).times(1e18)
          erc20_minter_contract.methods.approve(bridgeAddress, amountToBigNumber.toString()).call().then((isApprove: boolean) => {
            console.log(isApprove)
            isApprove && alaya.request({
              method: 'platon_sendTransaction',
              params: [createDepositTransactionParameters(platonAccount, currentAccount, amountToBigNumber)]
            })
              .then(result => {
                creatStatusInfo(status, 'success', `交易哈希: ${result}`);
                queueAction(status as ActionStatus);
              })
              .catch(error => {
                creatStatusInfo(status, 'error', error.message);
                queueAction(status as ActionStatus);
              });
            }
          );
        } catch (err) {
          console.log(err);
        }
      }
    }
  ;

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?
        <PublishAndRedeemCard className="left" title="赎回" unit='PDOT' isReverse={true} onClick={redeem}
                              setAmount={setAmount}/>
        : <PdotNodata title='赎回 PDOT' noDataMsg='请先登录 Polkadot 和 PlatON 账户'/>
      }
      <Records className="right" title="赎回记录" records={RedeemRecords} recordLength={redeemLength} arrows={true}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left{
    width: 636px;
  }
  .right{
    width: 308px;
  }
`;
