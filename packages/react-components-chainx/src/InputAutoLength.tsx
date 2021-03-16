// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { KEYS_PRE } from "@polkadot/react-components/Input";

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
    &:empty:before {
      color: #8E8E8E;
      content: attr(placeholder);
      position: relative;
      right:9px;
    }
    &:focus {
      border: 0px;
      outline: none;
    }
    
    line-height: 44px;
    display: inline-block;
    height: 22px;
    min-width: 20px;
    // max-width: 100px;
  }
`;

interface InputAutoLengthProps {
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
  className?: string;
  children?: any;
  tokenName?: string | undefined;
  placeholder?: any;
}

function getRegex(isDecimal: boolean): RegExp {
  const decimal = ".";

  return new RegExp(isDecimal ? `^(0|[1-9]\\d*)(\\${decimal}\\d{0,4})?$` : "^(0|[1-9]\\d*)$");
}

function InputAutoLength({
  className,
  children,
  tokenName,
  placeholder
}: InputAutoLengthProps): React.ReactElement<InputAutoLengthProps> {
  const [isPreKeyDown, setIsPreKeyDown] = useState(false);
  const _onKeyUp = useCallback((event: React.KeyboardEvent<Element>): void => {
    if (KEYS_PRE.includes(event.key)) {
      setIsPreKeyDown(false);
    }
  }, []);
  const _onKeyDown = useCallback((event: React.KeyboardEvent<Element>): void => {
    if (KEYS_PRE.includes(event.key)) {
      setIsPreKeyDown(true);
      return;
    }

    if (event.key.length === 1 && !isPreKeyDown) {
      const { selectionEnd: j, selectionStart: i, innerHTML } = event.target as HTMLInputElement;
      const newValue = `${innerHTML.substring(0, i || 0)}${event.key}${innerHTML.substring(j || 0)}`;

      if (!getRegex(true).test(newValue)) {
        event.preventDefault();
      }
    }
  }, []);

  return (
    <Wrapper className={className}>
      <div
        className="auto"
        suppressContentEditableWarning
        contentEditable="true"
        onKeyDown={_onKeyDown}
        onKeyUp={_onKeyUp}
        placeholder={placeholder}
      >
        {children}
      </div>

      <span className="flagtitle">
        {tokenName}
      </span>
    </Wrapper>
  );
}
export default InputAutoLength;
