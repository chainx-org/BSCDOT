import React, { useState } from 'react';
import { LinkWrap } from './Detail';
import { shortenHash } from '@polkadot/pages/helper/helper';

type Props = {
  hash: string;
  className?: string;
}


export default function ({ hash, className = '' }: Props): React.ReactElement<Props> {
  const [url] = useState<string>(`https://testnet.bscscan.com/tx/${hash}`)
  let result: string = shortenHash(hash)

  return (
    <>
      <LinkWrap className={`${className}`} href={url} target="_blank">{result}</LinkWrap>
    </>
  );
}
