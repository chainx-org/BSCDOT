import React, { useContext, useRef, useState } from 'react';
import Hash from './Hash';
import { Detail, Header, Account, Label, Line, Sequence, Inout, Amount } from './Detail';
import moment from 'moment';
import { useTranslation } from '@polkadot/pages/components/translate';
import { useOutsideClick } from '../hooks';
import { useApi } from '@polkadot/react-hooks';
import { TransferItem } from '@polkadot/pages/hooks/useTransferList';
import { CoinInfoContext } from '@polkadot/pages/components/CoinInfoProvider';
import BigNumber from 'bignumber.js';
import { BSCAccountsContext } from '@polkadot/pages/components/BSCAccountsProvider';

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

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <Line className='transfer' onClick={() => setOpen(!open)} ref={wrapper}>
      <Header>
        {/*<Sequence className='txNum'>{moment(new Date(records.blockTimestamp)).format('YYYY/MM/DD hh:mm:ss')}</Sequence>*/}
        <Inout>{record.to === BSCAccount ? t('In') : t('Out')}</Inout>
      </Header>
      <Account className='account'>
        <Amount>{(new BigNumber(record.value).div(1e18)).toNumber().toFixed(4)} {coinInfo.bCoinName}</Amount>
        {arrows ? <img src='http://lc-XLoqMObG.cn-n1.lcfile.com/cb023eeb56945d0cd674.svg' alt='Arrow' className='arrow'/> : ''}
        <Hash hash={record.to} className='address'/>
      </Account>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={record.transactionHash} className='hash'/>
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
