import React, { useContext, useEffect, useRef, useState } from 'react';
import Hash from './Hash';
import { Detail, Header, Account, Label, Line, Sequence, Inout, Amount } from './Detail';
import { useTranslation } from '@polkadot/pages/components/translate';
import { useOutsideClick } from '../hooks';
import { useApi } from '@polkadot/react-hooks';
import { TransferItem } from '@polkadot/pages/hooks/useTransferList';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';
import BigNumber from 'bignumber.js';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';
import { blockNumberToDate } from '@polkadot/pages/helper/helper';
import moment from 'moment';
import axios from 'axios'
interface Props {
  record: TransferItem;
  num: number;
  arrows: boolean;
}

export default function ({record, num, arrows}: Props): React.ReactElement {
  const {t} = useTranslation();
  const {isApiReady} = useApi();
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const {coinInfo} = useContext(CoinInfoContext)
  const {BSCAccount} = useContext(BSCAccountsContext)
  const [date, setDate] = useState<string>('');

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  // useEffect(() => {
  //   async function aaa(){
  //     const {data} = await axios.post('https://polkadot.subscan.io/api/scan/transfers', {
  //       "row": 10,
  //       "page": 1,
  //       "address": "1qMM9JKHnA82Po3SMnEgSuskAGXbWNiYJdxUexxYrt37VCz"
  //     })
  //     console.log('data', data)
  //   }
  //   aaa()
  // }, [])

  useEffect(() => {
    blockNumberToDate(record.blockNumber).then((timestamp: number) =>
      setDate(moment(timestamp).format('YYYY/MM/DD HH:mm:ss'))
    );
  }, [record.blockNumber]);

  return (
    <Line className='transfer' onClick={() => setOpen(!open)} ref={wrapper}>
      <Header>
        <Sequence className='txNum'>{date}</Sequence>
        <Inout>{record.to.toLowerCase() === BSCAccount.toLowerCase() ? t('In') : t('Out')}</Inout>
      </Header>
      <Account className='account'>
        <Amount>{(new BigNumber(record.value).div(1e18)).toNumber().toFixed(4)} {coinInfo.bCoinName}</Amount>
        {arrows ? <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/cb023eeb56945d0cd674.svg' alt='Arrow' className='arrow'/> : ''}
        <Hash hash={record.to} className='address'/>
      </Account>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>{t('Transaction hash')}</Label>
            <Hash hash={record.transactionHash} className='hash'/>
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
