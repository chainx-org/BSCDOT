import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import { StatusContext } from '@polkadot/pages/components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo, tipInAlaya, tipInPlaton } from '@polkadot/pages/helper/helper';
import { createDepositTransactionParameters, createApproveTransactionParameters } from '../contract';
import BigNumber from 'bignumber.js';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { useTranslation } from '@polkadot/pages/components/translate';
import Card from '@polkadot/pages/components/Card/Card';
import { AmountAndTip, Content, PublishAndRedeem, Title } from '@polkadot/pages/components/PdotCards/components';
import InputAutoLength from '@polkadot/pages/components/InputAutoLength';
import AccountMessage from '@polkadot/pages/components/AccountMessage';
import Button from '@polkadot/pages/components/Button';

interface Props {
  className?: string;
}

export default function RedeemContent({className}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {hasAccounts, currentAccount} = useContext(PolkadotAccountsContext);
  const {platonAccount, hasPlatonAccount, RedeemRecords, pdotAmount, fetchTransfers} = useContext(PlatonAccountsContext);
  const redeemLength = RedeemRecords.length;
  const [amount, setAmount] = useState<string>('0');
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'redeem'} as ActionStatus;
  const [charge, setCharge] = useState(0);
  const pdotAmountToBigNumber = (new BigNumber(pdotAmount)).div(1e18).toNumber();
  const amountToBigNumber = new BigNumber(amount);
  const [isChargeEnough, setIsChargeEnough] = useState<boolean>(true);
  const [isAmount, setIsAmount] = useState<boolean>(true);
  const {platonUnit, netName} = useContext(NetWorkContext);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!amount) {
      netName === 'Alaya' ? setCharge(tipInAlaya.toNumber()) : setCharge(tipInPlaton.toNumber());
    } else {
      const chargeOfAmount = amountToBigNumber.times(0.001);
      setCharge(chargeOfAmount.plus(netName === 'Alaya' ? tipInAlaya : tipInPlaton).toNumber());
    }
  }, [amount, netName]);

  useEffect(() => {
    setIsAmount(amountToBigNumber.toNumber() >= 1000);
    setIsChargeEnough(pdotAmountToBigNumber > charge && pdotAmountToBigNumber >= amountToBigNumber.toNumber());
  }, [pdotAmount, charge]);

  const sendErrorStatus = (error) => {
    creatStatusInfo(status, 'error', error.message);
    queueAction(status as ActionStatus);
  };

  const redeem = () => {
    if (platonAccount && amountToBigNumber.toNumber() && isChargeEnough && (amountToBigNumber.toNumber() > charge)) {
      try {
        setButtonDisabled(true);
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
              fetchTransfers(platonAccount);
              setButtonDisabled(false);
            })
            .catch(error => {
              sendErrorStatus(error);
              setButtonDisabled(false);
            })
        ).catch(error => {
          sendErrorStatus(error);
          setButtonDisabled(false);
        });
      } catch (err) {
        console.log(err);
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ? (
          <Card className='left' title={`${t('Redeem')} ${platonUnit}`}>
            <Content className="pdotContent">
              <PublishAndRedeem className={`ui-card-content`}>
                <AmountAndTip className='amountTit'>{t('Redeem')}{t('amount')}</AmountAndTip>
                <InputAutoLength placeholder="0" tokenName={platonUnit}
                                 onBlur={(e) => setAmount(e.target.textContent!)}/>
                <AmountAndTip
                  className='tip'>{t('service charge')}： {charge} {platonUnit}</AmountAndTip>
                <AccountMessage isReverse polkadotAddress={currentAccount} platonAddress={platonAccount}/>
                {/*<RedeemWarn className="warn isShow">{errorMessage}</RedeemWarn>*/}
                <Button className="isConfirm" onClick={redeem} text={`${t('Confirm')}${t('Redeem')}`}
                        disabled={isButtonDisabled}/>
              </PublishAndRedeem>
            </Content>
          </Card>) :
        <PdotNodata title={`${t('Redeem')} ${platonUnit}`}
                    noDataMsg={t('Please login to your Polkadot and PlatON accounts first')}/>
      }
      <Records className="right" title={t('Redeem record')} records={RedeemRecords} recordLength={redeemLength}
               arrows={true} isReverse={true}/>
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
