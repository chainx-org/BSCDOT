// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from "react";
import styled from "styled-components";

const KEYS = {
  A: 'a',
  ALT: 'Alt',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  C: 'c',
  CMD: 'Meta',
  CTRL: 'Control',
  // DECIMAL: getDecimalSeparator(),
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  V: 'v',
  X: 'x',
  ZERO: '0'
};

const KEYS_PRE: any[] = [KEYS.ALT, KEYS.CMD, KEYS.CTRL];

const Wrapper = styled.div`
  margin: 16px auto;
  font-family: PingFangSC-Semibold;
  font-size: 32px;
  color: #444c5e;
  height: 44px;
  line-height: 44px;
  outline: none;
  .auto {
    height: 44px !important;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 9px;
    &:empty:before {
      overflow: visible;
      color: #8e8e8e;
      content: attr(placeholder);
      position: relative;
      right: 9px;
    }
    &:focus {
      border: 0px;
      outline: none;
      white-space: no-wrap;
    }
    line-height: 44px;
    display: inline-block;
    // height: 22px;
    min-width: 30px;
  }
  .flagtitle {
    position: relative;
    bottom: 11px;
    padding-left: 10px;
  }
`;

interface InputAutoLengthProps {
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
  className?: string;
  children?: any;
  tokenName?: string | undefined;
  placeholder?: any;
  isDecimal?: boolean;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
}

function getRegex(isDecimal: boolean): RegExp {
  const decimal = ".";
  return new RegExp(isDecimal ? `^(0|[1-9]\\d*)(\\${decimal}\\d{0,4})?$` : "^(0|[1-9]\\d*)$");
}
var value = "";

function InputAutoLength({
  className,
  children,
  tokenName,
  placeholder,
  isDecimal,
  onBlur
}: InputAutoLengthProps): React.ReactElement<InputAutoLengthProps> {
  const [isPreKeyDown, setIsPreKeyDown] = useState(false);

  const _onKeyUp = useCallback((event: React.KeyboardEvent<Element>): void => {
    if (KEYS_PRE.includes(event.key)) {
      setIsPreKeyDown(false);
    }
  }, []);
  const _onKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEYS_PRE.includes(event.key)) {
        setIsPreKeyDown(true);
        return;
      }
      if (event.key.length === 1 && !isPreKeyDown) {
        value = event.target.innerText + event.key;
        if (!getRegex(true).test(value)) {
          event.preventDefault();
        }
      }
    },
    [isDecimal]
  );

  return (
    <Wrapper className={className}>
      <div
        className="auto"
        suppressContentEditableWarning
        contentEditable="true"
        onKeyDown={_onKeyDown}
        onKeyUp={_onKeyUp}
        placeholder={placeholder}
        onBlur={onBlur}
      >
        {children}
      </div>
      <span className="flagtitle">{tokenName}</span>
    </Wrapper>
  );
}
export default InputAutoLength;
