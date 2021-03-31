// Copyright 2017-2020 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import uiSettings from '@polkadot/ui-settings';

interface Props {
  className?: string;
}

const Lang = styled.div`
  padding: 50px 0;
  .line, .languages {
    color: #6F7C7C;
    opacity: 0.5;
  }
  .line {
    padding: 0 18px;
  }
  .lang {
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .active {
    color: #3F3F3F;
  }
`;

export function save (language: string): void {
  uiSettings.set({ i18nLang: language});
}

function Languages({ className = "" }: Props): React.ReactElement<Props> {
  const [language, setLanguage] =  useState<string>('zh')
  useEffect(() => {
    save(language)
  }, [language])



  return (
    <Lang>
      <span className={`lang  ${language==='zh'? 'active' : 'languages'}`}
        onClick={()=>setLanguage('zh')}>简体中文</span>
      <span className='line'>|</span>
      <span className={`lang  ${language==='en'? 'active' : 'languages'}`}
        onClick={()=>setLanguage('en')}>English</span>
    </Lang>
  );
}

export default Languages;
