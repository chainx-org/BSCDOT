
import React, { useRef, useState} from 'react';
import Hash from '../components/Hash';
import AccountAdd from '../components/AccountAdd'
import { Detail, Label } from '../components/Detail';
import { toPrecision } from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import moment from 'moment';
import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';
import {useApi} from '@polkadot/react-hooks';
import Arrow from '../components/arrow.svg'

export default function ({ transfer, num }: any) {
  const { t } = useTranslation();
  const {api, isApiReady} = useApi()
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
        <span className='txNum'>{moment(new Date(transfer.blockTimestamp)).format('YYYY/MM/DD hh:mm:ss')}</span>
        <span className='inout'>{transfer.type === 'OUT' ? t('Out'): t('In')}</span>
      </header>
      <div className='account'>
        <span className='amount'>{transfer.transferValue} {transfer.symbol}</span>
        {
          false ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        <span className='address'><AccountAdd address={transfer.transferTo} /></span>
      </div>
      {isApiReady && api.rpc.system.properties() && open ? (
        <Detail className={`detail  lineDetail${num}`}>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={transfer.txHash} />
          </div>
        </Detail>
      ) : null}
    </div>
  );
}
