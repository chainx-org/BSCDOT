// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from "react";
import styled from "styled-components";

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

const KEYS = {
  ALT: "Alt",
  CMD: "Meta",
  CTRL: "Control",
  ENTER: "Enter",
  SPACEBAR: "Spacebar",
  WHITE: " "
};

const KEYS_PRE: any[] = [KEYS.ALT, KEYS.CMD, KEYS.CTRL, KEYS.ENTER];

const KEY_CLEAR: any[] = [KEYS.ENTER, KEYS.SPACEBAR, KEYS.WHITE];

interface InputAutoLengthProps {
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
  className?: string;
  children?: any;
  tokenName?: string | undefined;
  placeholder?: any;
  isDecimal?: boolean;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void; //callback
}

function getRegex(isDecimal: boolean): RegExp {
  const decimal = ".";
  return new RegExp(isDecimal ? `^(0|[1-9]\\d*)(\\${decimal}\\d{0,4})?$` : "^(0|[1-9]\\d*)$");
}
// var value = "";

function InputAutoLength({
  className,
  children,
  tokenName,
  placeholder,
  isDecimal = true,
  onBlur
}: InputAutoLengthProps): React.ReactElement<InputAutoLengthProps> {
  const [isPreKeyDown, setIsPreKeyDown] = useState(false); // 是否设置preventDefault()

  const _onKeyDown = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEYS_PRE.includes(event.key)) {
        setIsPreKeyDown(true);
        event.preventDefault();
        return;
      }
      if (event.key.length === 1 && !isPreKeyDown) {
        let { innerText } = event.target as HTMLInputElement;
        let value = `${innerText.substring(0)}${event.key}`;
        if (!getRegex(true).test(value)) {
          event.preventDefault();
        }
      }
    },
    [isDecimal]
  );

  const _onKeyDownN = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEYS_PRE.includes(event.key)) {
        setIsPreKeyDown(true);
        event.preventDefault();
        return;
      }
      if (event.key.length === 1 && !isPreKeyDown) {
        let { innerText } = event.target as HTMLInputElement;
        let value = `${innerText.substring(0)}${event.key}`;
        if (!getRegex(false).test(value)) {
          event.preventDefault();
        }
      }
    },
    [isDecimal]
  );

  const _onKeyUp = useCallback(
    (event: React.KeyboardEvent<Element>): void => {
      if (KEY_CLEAR.includes(event.key)) {
        let value = `${event.target.innerText.substring(0)}${event.key}`;
        event.target.innerText = value.replace(/[^\d.]/g, "");
        // 光标设置到最后
        var element: Element | any = event.target;
        var range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        var sel: Selection | null = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setIsPreKeyDown(false);
    },
    [isDecimal]
  );

  return (
    <Wrapper className={className}>
      <>
        {isDecimal ? (
          <div
            className="auto"
            suppressContentEditableWarning
            contentEditable={true}
            onKeyDown={_onKeyDown}
            onKeyUp={_onKeyUp}
            placeholder={placeholder}
            onBlur={onBlur}
          >
            {children}
          </div>
        ) : (
          <div
            className="auto"
            suppressContentEditableWarning
            contentEditable="true"
            onKeyDown={_onKeyDownN}
            onKeyUp={_onKeyUp}
            placeholder={placeholder}
            onBlur={onBlur}
          >
            {children}
          </div>
        )}
      </>

      <span className="flagtitle">{tokenName}</span>
    </Wrapper>
  );
}
export default InputAutoLength;
