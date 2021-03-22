import link from '../components/link.svg';
import linkHighlight from '../components/link-highlight.svg';
import React, {useEffect, useState} from 'react';
import { LinkWrap } from './Detail';
import {useApi} from '@polkadot/react-hooks';

export default function ({ address = '', length = 5, mainnet = null }) {
  const {api} = useApi()
  const [url, setUrl] = useState<string>('')
  let result = address;

  if (address.length > 2 * length) {
    result =
      address.substring(0, 5) + '...' + address.substring(address.length - 5);
  }

  useEffect(() => {
    async function fetchUrl() {
      const testOrMain = await api.rpc.system.properties();
      const testOrMainNum = JSON.parse(testOrMain);
      if (testOrMainNum.ss58Format === 42) {
        setUrl(`https://testnet-scan.chainx.org/accounts/${address}`)
      } else {
        setUrl(`https://scan.chainx.org/accounts/${address}`)
      }
    }

    fetchUrl()
  }, [])

  return (
    <LinkWrap href={url} target='_blank'>
      <span title={address}>{result}</span>
      {/* <img alt='link'
        className='link'
        src={link} />
      <img
        alt='link-highlight'
        className='link-highlight'
        src={linkHighlight}
      /> */}
    </LinkWrap>
  );
}