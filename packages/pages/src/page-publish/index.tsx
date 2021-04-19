import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { PlatonAccountsContext } from '@polkadot/pages/components/PlatonAccountsProvider';
import PdotNodata from '../components/PdotCards/PdotNodata';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { useApi } from '@polkadot/react-hooks';
import { StatusContext } from '@polkadot/pages/components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo, tipInAlaya, tipInPlaton } from '@polkadot/pages/helper/helper';
import BigNumber from 'bignumber.js';
import { NetWorkContext } from '@polkadot/pages/components/NetWorkProvider';
import { useTranslation } from '@polkadot/pages/components/translate';
import { ApiContext } from '@polkadot/react-api';
import Card from '@polkadot/pages/components/Card/Card';
import {
  AmountAndTip,
  Content,
  PublishAndRedeem,
  RedeemWarn,
  Title
} from '@polkadot/pages/components/PdotCards/components';
import InputAutoLength from '@polkadot/pages/components/InputAutoLength';
import AccountMessage from '@polkadot/pages/components/AccountMessage';
import Button from '@polkadot/pages/components/Button';

interface Props {
  className?: string;
}

export default function PublicContent({className}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {hasPlatonAccount, platonAccount, PublishRecords, pdotAmount, fetchTransfers} = useContext(PlatonAccountsContext);
  const publishLength = PublishRecords.length;
  const {hasAccounts, currentAccount, usableBalance} = useContext(PolkadotAccountsContext);
  const [amount, setAmount] = useState<string>('0');
  const {api} = useApi();
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'publish'} as ActionStatus;
  const [charge, setCharge] = useState(0);
  const [isChargeEnough, setIsChargeEnough] = useState<boolean>(true);
  const [isAmount, setIsAmount] = useState<boolean>(true);
  const amountToBigNumber = new BigNumber(amount);
  const usableBalanceToBigNumber = (new BigNumber(usableBalance)).div(1e12).toNumber();
  const {platonUnit, netName} = useContext(NetWorkContext);
  const {formatProperties} = useContext(ApiContext);
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
    setIsChargeEnough(usableBalanceToBigNumber > charge && usableBalanceToBigNumber > amountToBigNumber.toNumber() + charge);
  }, [pdotAmount, charge, usableBalance, amountToBigNumber]);

  const displayStatusAndFetchBalance = (formatStatusData: any) => {
    if (formatStatusData.dispatchInfo) {
      if (formatStatusData.status.inBlock) {
        creatStatusInfo(status, 'success', t('The publish is successful'));
        queueAction(status as ActionStatus);
        fetchTransfers(platonAccount);
        setButtonDisabled(false);
      }
    } else {
      creatStatusInfo(status, 'sending', t('sending...'));
      queueAction(status as ActionStatus);
    }
  };

  const publish = () => {
    async function publishEvent() {
      if (hasAccounts && amountToBigNumber.toNumber() && platonAccount && isChargeEnough && (amountToBigNumber.toNumber() > charge)) {
        try {
          setButtonDisabled(true);
          const injector = await web3FromAddress(currentAccount);
          const amountToPrecision = amountToBigNumber.times(1e12).toNumber();
          api.setSigner(injector.signer);
          api.tx.utility.batch([
            api.tx.balances.transferKeepAlive('5F3NgH5umL6dg6rmtKEm6m7z75YZwkBkyTybksL9CZfXxvPT', amountToPrecision),
            api.tx.system.remark(platonAccount)
          ])
            .signAndSend(
              currentAccount,
              {signer: injector.signer},
              (statusData) => {
                const formatStatusData = JSON.parse(JSON.stringify(statusData));
                displayStatusAndFetchBalance(formatStatusData);
              })
            .then(result => {
              console.log('result', result);
            })
            .catch(error => {
              creatStatusInfo(status, 'error', (error as Error).message);
              queueAction(status as ActionStatus);
              setButtonDisabled(false);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }

    publishEvent();
  };

  return (
    <Wrapper className={`contentWrapper ${className}`}>
      {hasPlatonAccount && hasAccounts ?(
        <Card className='left'>
          <Title className={`ui-card-title `}>{t('Publish')} {formatProperties.tokenSymbol[0]}</Title>
          <Content className="pdotContent">
            <PublishAndRedeem className={`ui-card-content`}>
              <AmountAndTip className='amountTit'>{t('Publish')}{t('amount')}</AmountAndTip>
              <InputAutoLength placeholder="0" tokenName={formatProperties.tokenSymbol[0]}
                               onBlur={(e) => setAmount(e.target.textContent!)}/>
              <AmountAndTip
                className='tip'>{t('service charge')}： {charge} {formatProperties.tokenSymbol[0]}</AmountAndTip>
              <AccountMessage isReverse={false} polkadotAddress={currentAccount} platonAddress={platonAccount}/>
              {/*<RedeemWarn className="warn isShow">{errorMessage}</RedeemWarn>*/}
              <Button className="isConfirm" onClick={publish} text={`${t('Confirm')}${t('Publish')}`}
                      disabled={isButtonDisabled}/>
            </PublishAndRedeem>
          </Content>
        </Card>):
        <PdotNodata title={`${t('Publish')} ${platonUnit}`}
        noDataMsg={t('Please login to your Polkadot and PlatON accounts first')}/>
      }
      <Records className="right" title={t('Publish record')} records={PublishRecords} recordLength={publishLength}
               arrows={true} isReverse={false}/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    width: 636px;
  }
  .right {
    width: 308px;
  }
`;
