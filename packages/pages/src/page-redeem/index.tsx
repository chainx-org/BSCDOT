import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import PublishAndRedeemCard from '../components/PdotCards/PublishAndRedeemCard';
import { StatusContext } from '@polkadot/pages/components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo } from '@polkadot/pages/helper/helper';
import { createDepositTransactionParameters, createApproveTransactionParameters } from '../contract';
import BigNumber from 'bignumber.js';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { useTranslation } from '@polkadot/pages/components/translate';

interface Props {
  className?: string;
}

export default function RedeemContent({className}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {hasAccounts, currentAccount} = useContext(PolkadotAccountsContext);
  const {platonAccount, hasPlatonAccount, RedeemRecords, pdotAmount, fetchTransfers } = useContext(PlatonAccountsContext);
  const redeemLength = RedeemRecords.length;
  const [amount, setAmount] = useState<string>('0');
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'redeem'} as ActionStatus;
  const [charge, setCharge] = useState(0.3)
  const pdotAmountToBigNumber = (new BigNumber(pdotAmount)).div(1e18).toNumber()
  const amountToBigNumber = new BigNumber(amount)
  const [isChargeEnough, setIsChargeEnough] = useState<boolean>(true)
  const {platonUnit} = useContext(NetWorkContext);

  useEffect(() => {
    if(!amount){
      setCharge(0.3)
    }else{
      const chargeOfAmount = amountToBigNumber.times(0.001).toNumber()
      setCharge(chargeOfAmount + 0.3)
    }
  }, [amount])

  useEffect(() => {
    setIsChargeEnough(pdotAmountToBigNumber > charge && pdotAmountToBigNumber > amountToBigNumber.toNumber())
  }, [pdotAmount, charge])

  const sendErrorStatus = (error) => {
    creatStatusInfo(status, 'error', error.message);
    queueAction(status as ActionStatus);
  }

  const redeem = () => {
    if (platonAccount && amount && isChargeEnough) {
      try {
        const amountToPrecision: BigNumber = amountToBigNumber.times(1e18);
        alaya.request({
          method: 'platon_sendTransaction',
          params: [createApproveTransactionParameters(platonAccount, amountToPrecision)]
        }).then(() =>
          alaya.request({
            method: 'platon_sendTransaction',
            params: [createDepositTransactionParameters(platonAccount, currentAccount, amountToPrecision)]
          })
            .then(result => {
              creatStatusInfo(status, 'success', `${t('Transaction hash')}: ${result}`);
              queueAction(status as ActionStatus);
              fetchTransfers(platonAccount)
            })
            .catch(error => {
              sendErrorStatus(error)
            })
        ).catch(error => {
          sendErrorStatus(error)
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?
        <PublishAndRedeemCard
          className="left"
          title={t('Redeem')}
          unit={platonUnit}
          isReverse={true}
          onClick={redeem}
          charge={charge}
          setAmount={setAmount}
          isChargeEnough={isChargeEnough}/>

        : <PdotNodata title={`${t('Redeem')} ${platonUnit}`} noDataMsg={t('Please login to your Polkadot and PlatON accounts first')}/>
      }
      <Records className="right" title={t('Redeem record')} records={RedeemRecords} recordLength={redeemLength} arrows={true} isReverse={true} />
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
