// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Routes } from './types';

import accounts from './accounts';
import contracts from './contracts';
import settings from './settings';
import signing from './signing';

export default function create(t: TFunction): Routes {
  return [
    accounts(t),
    contracts(t),
    signing(t),
    settings(t),

  ];
}
