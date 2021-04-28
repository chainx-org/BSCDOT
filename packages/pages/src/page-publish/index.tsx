import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Records } from '@polkadot/pages/components';
import { PolkadotAccountsContext } from '@polkadot/pages/components/PolkadotAccountsProvider';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';
import { web3FromAddress } from '@polkadot/extension-dapp';
import { useApi } from '@polkadot/react-hooks';
import { StatusContext } from '@polkadot/pages/components';
import { ActionStatus } from '@polkadot/pages/components/Status/types';
import { creatStatusInfo, tipInAlaya, tipInPlaton } from '@polkadot/pages/helper/helper';
import BigNumber from 'bignumber.js';
import { useTranslation } from '@polkadot/pages/components/translate';
import Card from '@polkadot/pages/components/Card/Card';
import { CardContent } from '@polkadot/pages/components';
import EmptyCard from '@polkadot/pages/components/PdotCards/EmptyCard';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';
import { ApiProps } from '@polkadot/react-api/types';
import { ApiContext } from '@polkadot/react-api';

interface Props {
  className?: string;
}

export default function PublicContent({className = ''}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const {BSCAccount, hasBSCAccount, PublishRecords, fetchTransfers} = useContext(BSCAccountsContext);
  const publishLength = PublishRecords.length;
  const {hasAccounts, currentAccount, usableBalance} = useContext(PolkadotAccountsContext);
  const [amount, setAmount] = useState<string>('0');
  const {api, isApiReady} = useApi();
  const {queueAction} = useContext(StatusContext);
  const status = {action: 'publish'} as ActionStatus;
  const [charge, setCharge] = useState(0);
  const [isChargeEnough, setIsChargeEnough] = useState<boolean>(true);
  const amountToBigNumber = new BigNumber(amount);
  const usableBalanceToBigNumber = (new BigNumber(usableBalance)).div(1e12).toNumber();
  const {coinInfo} = useContext(CoinInfoContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  const {formatProperties} = useContext<ApiProps>(ApiContext);


  useEffect(() => {
    setIsChargeEnough(usableBalanceToBigNumber > charge && usableBalanceToBigNumber > amountToBigNumber.toNumber() + charge);
  }, [charge, usableBalance, amountToBigNumber]);

  useEffect(() => {
    if (!isChargeEnough) {
      setErrorMessage(t('The balance is insufficient'));
    } else if (amountToBigNumber.toNumber() <= charge) {
      setErrorMessage(t('The input amount should be greater than the handling fee'));
    } else {
      setErrorMessage('');
    }
  }, [isChargeEnough, t, amount, charge]);

  const displayStatusAndFetchBalance = (formatStatusData: any) => {
    if (formatStatusData.dispatchInfo) {
      if (formatStatusData.status.inBlock) {
        creatStatusInfo(status, 'success', t('The publish is successful'));
        queueAction(status as ActionStatus);
        fetchTransfers(BSCAccount);
        setButtonDisabled(false);
      }
    } else {
      creatStatusInfo(status, 'sending', t('sending...'));
      queueAction(status as ActionStatus);
    }
  };

  const publish = () => {
    async function publishEvent() {
      if (hasAccounts && amountToBigNumber.toNumber() && BSCAccount && isChargeEnough && (amountToBigNumber.toNumber() > charge)) {
        try {
          setButtonDisabled(true);
          const injector = await web3FromAddress(currentAccount);
          const amountToPrecision = amountToBigNumber.times(Math.pow(10, formatProperties.tokenDecimals[0])).toNumber();
          api.setSigner(injector.signer);
          let param: any;
          param = coinInfo.coinName === 'XBTC' ? [
            api.tx.xAssets.transfer('5F3NgH5umL6dg6rmtKEm6m7z75YZwkBkyTybksL9CZfXxvPT', 1, amountToPrecision),
            api.tx.system.remark('hex' + BSCAccount)
          ] : [
            api.tx.balances.transferKeepAlive('5F3NgH5umL6dg6rmtKEm6m7z75YZwkBkyTybksL9CZfXxvPT', amountToPrecision),
            api.tx.system.remark('hex' + BSCAccount)
          ];
          api.tx.utility.batch(param)
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
      {hasBSCAccount && hasAccounts && isApiReady ? (
          <Card className='left' title={`${t('Publish')} ${coinInfo.coinName}`}>
            <CardContent
              tokenName={coinInfo.coinName}
              tipLabel={t('Publish amount')}
              charge={charge}
              onClick={publish}
              buttonText={t('Confirm Publish')}
              isButtonDisabled={isButtonDisabled}
              setAmount={setAmount}
              errorMessage={errorMessage}
              isReverse={false}/>
          </Card>) :
        <EmptyCard
          title={`${t('Publish')} ${coinInfo.coinName ? coinInfo.coinName : ''}`}/>}
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
