// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import BN from 'bn.js';
import styled from 'styled-components';
import Input from './Input';

interface Props {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  isDecimal?: boolean;
  maxValue?: BN;
  maxLength?: number;
  onChange?: (value?: BN) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  placeholder?: string;
  value?: any;
  precision?: number | undefined;
  tokenName?: string | undefined;
  onKeyPress?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
}

const KEYS = {
  ALT: 'Alt',
  CMD: 'Meta',
  CTRL: 'Control',
};
const KEYS_PRE: any[] = [KEYS.ALT, KEYS.CMD, KEYS.CTRL];

function getRegex(isDecimal: boolean): RegExp {
  const decimal = '.';

  return new RegExp(
    isDecimal
      ? `^(0|[1-9]\\d*)(\\${decimal}\\d{0,4})?$`
      : '^(0|[1-9]\\d*)$'
  );
}


function InputDex ({ autoFocus, children, className = '', tokenName, isDecimal, onChange, onEnter, onEscape, onKeyPress, onKeyDown, onKeyUp, placeholder, value }: Props): React.ReactElement<Props> {
  const [isPreKeyDown, setIsPreKeyDown] = useState(false);
  const _onKeyUp = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEYS_PRE.includes(event.key)) {
        setIsPreKeyDown(false);
      }
    },
    []
  );
  const _onKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEYS_PRE.includes(event.key)) {
        setIsPreKeyDown(true);

        return;
      }

      if (event.key.length === 1 && !isPreKeyDown) {
        const { selectionEnd: j, selectionStart: i, value } = event.target as HTMLInputElement;
        const newValue = `${value.substring(0, i || 0)}${event.key}${value.substring(j || 0)}`;
        if (!getRegex(true).test(newValue)) {
          event.preventDefault();
        }
      }

    },
    [isDecimal]
  );

  return (
    <Input
      autoFocus={autoFocus}
      className={`ui--InputBalance ${className}`}
      onChange={onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      onKeyPress={onKeyPress}
      onKeyDown={_onKeyDown}
      onKeyUp={_onKeyUp}
      value={value}
      placeholder={placeholder}
      tokenName={tokenName}
      >
      {children}
    </Input>
  );
}

export default React.memo(styled(InputDex)`
  width: 278px;
 
`);