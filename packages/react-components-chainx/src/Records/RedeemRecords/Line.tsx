
import React, {useRef, useState} from 'react';
import Hash from '../components/Hash';
// import Address from './Address';
import AccountAdd from '../components/AccountAdd'
import { Detail, Label } from '../components/Detail';
import { useTranslation } from '@polkadot/react-components/translate';
import useOutsideClick from '@polkadot/app-accounts-chainx/Myview/useOutsideClick';
import {useApi} from '@polkadot/react-hooks';
import Arrow from '../components/arrow.svg'

export default function ({ transfer }: any) {
  // const { t } = useTranslation();
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
        <span className='txNum'>交易号 {transfer.seq}</span>
        <span>
        {/* {transfer.data[1] === currentAccount? <span className='pending'>进行中</span> : <span className='reslove'>已完成</span>} */}
        </span>
      </header>
      <div className='account'>
        <span><AccountAdd address={transfer.txFrom} /></span>
        {
          true ? <img src={Arrow} alt='Arrow' className='arrow' />: ''
        }
        <span><AccountAdd address={transfer.transferTo} /></span>
      </div>
      {isApiReady && api.rpc.system.properties() && open ? (
        <Detail className='detail'>
          <div className='hashVal'>
            <Label>交易哈希</Label>
            <Hash hash={transfer.txHash} />
          </div>
          {/* <div className='affirm'>
            <Label>多签确认哈希</Label>
            <Address address={transfer.txHash} />
          </div> */}
        </Detail>
      ) : null}
    </div>
  );
}
