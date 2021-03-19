
import React from 'react';
import { LinkWrap } from './Detail';


export default function ({ hash = '', length = 5 }) {

  let result: string = hash
  if (hash.length > 2 * length) {
    result = hash.substring(0, 5) + '...' + hash.substring(hash.length - 5)
  }

  return (
    <LinkWrap>
      <span>{result}</span>
    </LinkWrap>
  );
}
