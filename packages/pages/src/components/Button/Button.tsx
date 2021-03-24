import React, { useCallback } from "react";
import styled from "styled-components";

interface ButtonProps {
  className?: string;
  onClick?: () => void | Promise<void>;
  text: string;
}

function Button({ className, onClick, text }: ButtonProps): React.ReactElement<ButtonProps> {
  const _onClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <button className={`ui-button ${className}`} onClick={_onClick}>
      {text}
    </button>
  );
}

export default React.memo(styled(Button)`
  text-align: center;
  vertical-align: middle;
  border: 0;
  outline: none;
  &.isConfirm {
    width: 212px;
    height: 52px;
    margin: 0 auto;
    background: #51abad;
    border-radius: 10px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #ffffff;
  }
`);
