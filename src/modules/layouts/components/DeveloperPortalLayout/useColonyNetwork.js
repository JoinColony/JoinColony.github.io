/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getNetworkClient } from '@colony/colony-js-client';
import { useEffect, useState } from 'react';

import type { Network } from '~types';

const useColonyNetwork = (network: ?Network, wallet: WalletObjectType) => {
  const [networkClient, setNetworkClient] = useState<?ColonyNetworkClient>(
    null,
  );

  useEffect(() => {
    (async () => {
      if (network && wallet) {
        const result = await getNetworkClient(network.slug, wallet);
        setNetworkClient(result);
      }
    })();
  }, [network, wallet]);

  return { networkClient };
};

export default useColonyNetwork;
