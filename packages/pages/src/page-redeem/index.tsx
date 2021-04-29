import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import EmptyCard from '../components/PdotCards/EmptyCard';
import { StatusContext, CardContent } from '@polkadot/pages/components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo, tipInAlaya, tipInDOT, tipInPCX, tipInPlaton, tipInXBTC } from '@polkadot/pages/helper/helper';
import { createDepositTransactionParameters, createApproveTransactionParameters } from '../contract';
import BigNumber from 'bignumber.js';
import { useTranslation } from '@polkadot/pages/components/translate';
import Card from '@polkadot/pages/components/Card/Card';
import { useApi } from '@polkadot/react-hooks';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';

interface Props {
  className?: string;
  charge: number;
  setCharge: React.Dispatch<number>;
}

export default function RedeemContent({charge, setCharge, className=''}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {isApiReady} = useApi();
  const {currentAccount, hasAccounts} = useContext(PolkadotAccountsContext);
  const {BSCAccount, hasBSCAccount, RedeemRecords, fetchTransfers} = useContext(BSCAccountsContext);
  const redeemLength = RedeemRecords.length;
  const [amount, setAmount] = useState<string>('0');
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'redeem'} as ActionStatus;
  const pdotAmountToBigNumber = (new BigNumber(BSCAccount)).div(1e18).toNumber();
  const amountToBigNumber = new BigNumber(amount);
  const [isChargeEnough, setIsChargeEnough] = useState<boolean>(true);
  const {coinInfo} = useContext(CoinInfoContext);
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    coinInfo.coinName === 'XBTC'? setCharge(tipInXBTC.toNumber()):
      coinInfo.coinName === 'PCX'?
        setCharge(amountToBigNumber.times(0.001).plus(tipInPCX).toNumber()):
        setCharge(amountToBigNumber.times(0.001).plus(tipInDOT).toNumber())
  }, [coinInfo, amountToBigNumber])

  useEffect(() => {
    setIsChargeEnough(pdotAmountToBigNumber > charge && pdotAmountToBigNumber >= amountToBigNumber.toNumber());
  }, [BSCAccount, charge]);

  useEffect(() => {
    if (!isChargeEnough) {
      setErrorMessage(t('The balance is insufficient'));
    } else if (amountToBigNumber.toNumber() <= charge) {
      setErrorMessage(t('The input amount should be greater than the handling fee'));
    } else if (amountToBigNumber.toNumber() >= 1000) {
      setErrorMessage(t('The amount cannot exceed 1000'));
    } else {
      setErrorMessage('');
    }
  }, [isChargeEnough, amountToBigNumber, t, charge]);

  const sendErrorStatus = (error) => {
    creatStatusInfo(status, 'error', error.message);
    queueAction(status as ActionStatus);
  };

  const redeem = () => {
    if (BSCAccount && amountToBigNumber.toNumber() && isChargeEnough && (amountToBigNumber.toNumber() > charge)) {
      try {
        setButtonDisabled(true);
        const amountToPrecision: BigNumber = amountToBigNumber.times(1e18);
        //@ts-ignore
        ethereum.request({
          method: 'eth_sendTransaction',
          params: [createApproveTransactionParameters(BSCAccount, amountToPrecision)]
        }).then(() =>
          //@ts-ignore
          ethereum.request({
            method: 'eth_sendTransaction',
            params: [createDepositTransactionParameters(BSCAccount, currentAccount, amountToPrecision)]
          })
            .then(result => {
              creatStatusInfo(status, 'success', `${t('Transaction hash')}: ${result}`);
              queueAction(status as ActionStatus);
              fetchTransfers(BSCAccount);
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
      {hasBSCAccount && hasAccounts && isApiReady ? (
          <Card className='left' title={`${t('Redeem')} ${coinInfo.bCoinName}`}>
            <CardContent
              tokenName={coinInfo.bCoinName}
              tipLabel={t('Redeem amount')}
              charge={charge}
              onClick={redeem}
              buttonText={t('Confirm Redeem')}
              isButtonDisabled={isButtonDisabled}
              setAmount={setAmount}
              errorMessage={errorMessage}
              isReverse/>
          </Card>) :
        <EmptyCard
          title={`${t('Redeem')} ${coinInfo.bCoinName ? coinInfo.bCoinName : ''}`}/>}

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
