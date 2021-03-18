
import React, {useContext, useRef, useState} from 'react';
import Hash from './Hash';
import Address from './Address';
import AccountAdd from './AccountAdd'
import Detail from '../components/Detail';
import Label from '../components/Label';
import { toPrecision } from '@polkadot/app-accounts-chainx/Myview/toPrecision';
import moment from 'moment';
import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';
import {AccountContext} from '@polkadot/react-components-chainx/AccountProvider';
import {useApi} from '@polkadot/react-hooks';
import Arrow from '../components/arrow.svg'

export default function ({ transfer }: any) {
  const { t } = useTranslation();
  const {api, isApiReady} = useApi()
  const [open, setOpen] = useState(false);
  const { currentAccount } = useContext(AccountContext);
  const wrapper = useRef(null);

  useOutsideClick(wrapper, () => {
    setOpen(false);
  });

  return (
    <div className='line'
      onClick={() => setOpen(!open)}
      ref={wrapper}>
      <header>
        <span className='txNum'>交易号 </span>
        {/* <span>{moment(new Date(transfer.indexer.blockTime)).format('YYYY/MM/DD')}</span> */}
        {/* <span>{toPrecision(transfer.data[2], 8)}</span> */}
        <span>{transfer.data[1] === currentAccount? <span className='pending'>进行中</span> : <span className='reslove'>已完成</span>}</span>
      </header>
      <div className='account'>
        <span><AccountAdd address={transfer.data[1]} /></span>
        {
          true ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        {/* <span>{transfer.data[1] === currentAccount? t('In') : t('Out')}</span> */}
        <span><AccountAdd address={transfer.data[1]} /></span>
      </div>
      {isApiReady && api.rpc.system.properties() && open ? (
        <Detail className='detail'>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={transfer.extrinsicHash} />
          </div>
          <div className='affirm'>
            <Label>多签确认哈希</Label>
            <Address address={transfer.data[1]} />
          </div>
        </Detail>
      ) : null}
    </div>
  );
}
