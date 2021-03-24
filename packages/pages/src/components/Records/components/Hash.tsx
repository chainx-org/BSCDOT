import React from 'react';
import { LinkWrap } from './Detail';

type Props = {
  hash: string;
  length?: number;
  className?: string;
}

export default function ({ hash, length = 5, className = '' }: Props): React.ReactElement<Props> {

  let result: string = hash
  if (hash.length > 2 * length) {
    result = hash.substring(0, 5) + '...' + hash.substring(hash.length - 5)
  }

  return (
    <>
      <LinkWrap className={`${className}`}>{result}</LinkWrap>
    </>
  );
}
