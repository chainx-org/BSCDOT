// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { KEYS_PRE } from "@polkadot/react-components/Input";

const Wrapper = styled.div`
  display: flex !important;
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
      border: 0;
      outline: none;
      white-space: nowrap;
    }

    line-height: 44px;
    display: inline-block;
    // height: 22px;
    min-width: 30px;
  }
  .flagTitle{
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
  onBlur?: (event: React.FocusEvent) => void;
  isDecimal?: boolean;
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
  onBlur,
  isDecimal
}: InputAutoLengthProps): React.ReactElement<InputAutoLengthProps> {
  const [isPreKeyDown, setIsPreKeyDown] = useState(false);

  const _onKeyUp = useCallback((event: React.KeyboardEvent<Element>): void => {
    if (event.key === "Backspace") {
      value = value.substr(0,value.length-1)
    }
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
        const newValue = `${event.key}`;
        value = value.concat(newValue);
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
