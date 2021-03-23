
import React, { useRef, useState} from 'react';
import Hash from './Hash';
import { Detail, Label } from './Detail';
// import { toPrecision } from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import moment from 'moment';
import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';
import {useApi} from '@polkadot/react-hooks';
import Arrow from '../components/arrow.svg'

export default function ({ records, num, arrows }: any) {
  const { t } = useTranslation();
  const {isApiReady} = useApi()
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <div className='line'
      onClick={() => setOpen(!open)}
      ref={wrapper}>
      <header>
        <span className='txNum'>{moment(new Date(records.blockTimestamp)).format('YYYY/MM/DD hh:mm:ss')}</span>
        <span className='inout'>{records.type === 'OUT' ? t('Out'): t('In')}</span>
      </header>
      <div className='account'>
        <span className='amount'>{records.transferValue} {records.symbol}</span>
        {
          arrows ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        <span className='address'><Hash hash={records.transferTo} /></span>
      </div>
      {isApiReady && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={records.txHash} />
          </div>
        </Detail>
      ) : null}
    </div>
  );
}
