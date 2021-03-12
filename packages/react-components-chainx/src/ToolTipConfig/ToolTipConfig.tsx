import React, { useState } from "react";
import styled from "styled-components";
import { Cell } from "./components/Cell/Cell";
import ALAYA from "./components/assets/alaya.svg";
import PLATON from "./components/assets/platon.svg";

const Wrapper = React.memo(styled.section`
  //   overflow: hidden;
  max-height: 500px !important;
  overflow: auto;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #efefef;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  width: 312px;
`);

interface ToolTipConfigProps {}

export function ToolTipConfig({}: ToolTipConfigProps): React.ReactElement<ToolTipConfigProps> {
  const [value, setValue] = useState(false);
  const list: any = [
    {
      title: "Platon 网络",
      iconUrl: ALAYA
    },
    {
      title: "Gabriel Soares",
      content: "12BPUMLYobYiBjPuRCnNd9xZcEAjzXYM5Vjweaa327YwD8FA"
    }
  ];

  return (
    <Wrapper>
      {list.map(function(item: any) {
        return (
          <Cell
            key={item.title}
            isSelected={value == item.title}
            setValue={setValue}
            iconUrl={item.iconUrl}
            title={item.title}
            content={item.content}
          />
        );
      })}
    </Wrapper>
  );
}
