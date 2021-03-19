import React from 'react';
import {LinkWrapper} from './Detail';

export default function ({ address = '', length = 5, mainnet = null }) {

  let result = address;
  if (address.length > 2 * length) {
    result =
      address.substring(0, 5) + '...' + address.substring(address.length - 5);
  }

  return (
    <LinkWrapper>
      <span title={address}>{result}</span>
    </LinkWrapper>
  );
}
