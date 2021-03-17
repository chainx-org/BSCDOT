// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitLength } from "./types";

import BN from "bn.js";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { BitLengthOption } from "@polkadot/react-components/constants";
import { BN_TEN, formatBalance, isBn } from "@polkadot/util";
import { Input } from "@polkadot/react-components";
import { KEYS_PRE } from "@polkadot/react-components/Input";
// import Input from './Input';

interface Props {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  isDecimal?: boolean;
  isError?: boolean;
  isFull?: boolean;
  isWarning?: boolean;
  isZeroable?: boolean;
  maxValue?: BN;
  maxLength?: number;
  onChange?: (value?: BN) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  placeholder?: string;
  value?: any;
  withEllipsis?: boolean;
  withLabel?: boolean;
  withMax?: boolean;
  precision?: number | undefined;
  tokenName?: string | undefined;
  onKeyPress?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  onKeyUp?: (event: React.KeyboardEvent<Element>) => void;
}

// const BN_TEN_THOUSAND = new BN(10_000);
const DEFAULT_BITLENGTH = BitLengthOption.CHAIN_SPEC as BitLength;

function getRegex(isDecimal: boolean): RegExp {
  const decimal = ".";

  return new RegExp(isDecimal ? `^(0|[1-9]\\d*)(\\${decimal}\\d{0,4})?$` : "^(0|[1-9]\\d*)$");
}

function InputAutoLength({
  autoFocus,
  children,
  className = "",
  precision,
  tokenName,
  isDisabled,
  isError,
  isDecimal,
  isFull,
  isWarning,
  isZeroable,
  maxValue,
  maxLength,
  onChange,
  onEnter,
  onEscape,
  onKeyPress,
  onKeyDown,
  onKeyUp,
  placeholder,
  value,
  withEllipsis,
  withLabel,
  withMax
}: Props): React.ReactElement<Props> {
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
      bitLength={DEFAULT_BITLENGTH}
      className={`ui--InputBalance ${className}`}
      isDisabled={isDisabled}
      isError={isError}
      isFull={isFull}
      isWarning={isWarning}
      isZeroable={isZeroable}
      maxValue={maxValue}
      maxLength={maxLength}
      onChange={onChange}
      onEnter={onEnter}
      onEscape={onEscape}
      onKeyPress={onKeyPress}
      onKeyDown={_onKeyDown}
      onKeyUp={_onKeyUp}
      value={value}
      withEllipsis={withEllipsis}
      withLabel={withLabel}
      withMax={withMax}
      placeholder={placeholder}
    >
      <span className="flagtitle">{tokenName}</span>
      {children}
    </Input>
  );
}

export default React.memo(styled(InputAutoLength)`
textarea{
  border: 0px solid red;
  background-color:#fff;
  overflow-y:hidden;
  overflow-x:hidden;
}
  &&:not(.isSmall) .labelExtra {
    right: 0rem;
  }
  &.ui--Labelled:not(.isSmall) {
    padding-left: 0;
  }
  &.ui--Labelled:not(.isSmall):not(.isOuter) > label {
    // display: none;
  }
  &.ui--Labelled {
    // width: 100px;
    display: inline;
    height: 44px;
    line-height: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #444c5e;
    border: 0px solid #dce0e2;
    cursor: text;
    // position: absolute;
    position: relative;

    background: #ffffff;
    // box-sizing: border-box;
    &:focus {
      border: 0px;
    }
    .ui--Labelled-content {
      .ui--Input {
        margin: 0 !important;
        padding-left: 0px;
        display: flex;
        align-items: center;

        input {
          padding: 0 10px !important;
          width: 40px;
          border: 0;
          height: 44px;
          line-height: 44px;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #444c5e;
          &::-webkit-input-placeholder {
            text-align: center;
            position: relative;
            right:9px;
          }
        }
        .flagtitle {
          color: #444c5e;
        }
      }
    }
  }
  .ui.action.input.ui--Input > .buttons {
    align-items: stretch;
    .ui--SiDropdown.ui.button.compact.floating.selection.dropdown {
      &.disabled {
        border-style: solid;
        opacity: 1 !important;
      }
      > div.text:first-child {
        font-size: 0.9em;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0.5rem;
        width: 3rem;
      }
    }
  }
`);