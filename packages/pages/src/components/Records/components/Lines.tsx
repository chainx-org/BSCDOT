import React, { useRef, useState } from 'react';
import Hash from './Hash';
import { Detail, Header, Account, Label, Line, Sequence, Inout, Amount } from './Detail';
import moment from 'moment';
import { useTranslation } from '@polkadot/pages/components/translate';
import { useOutsideClick } from '../hooks';
import { useApi } from '@polkadot/react-hooks';
import Arrow from './arrow.svg';

export default function ({records, num, arrows}: any) {
  const {t} = useTranslation();
  const {isApiReady} = useApi();
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <Line className='transfer' onClick={() => setOpen(!open)} ref={wrapper}>
      <Header>
        <Sequence className='txNum'>{moment(new Date(records.blockTimestamp)).format('YYYY/MM/DD hh:mm:ss')}</Sequence>
        <Inout>{records.type === 'OUT' ? t('Out') : t('In')}</Inout>
      </Header>
      <Account className='account'>
        <Amount>{records.transferValue} {records.symbol}</Amount>
        {arrows ? <img src={Arrow} alt='Arrow' className='arrow'/> : ''}
        <Hash hash={records.transferTo} className='address'/>
      </Account>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={records.txHash} className='hash'/>
          </div>
        </Detail>
      ) : null}
    </Line>
  );
}
