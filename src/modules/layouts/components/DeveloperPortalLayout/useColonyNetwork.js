/* @flow */

import type {
  ColonyClient,
  ColonyNetworkClient,
} from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getNetworkClient } from '@colony/colony-js-client';
import { useEffect, useState } from 'react';

import type { Network } from '~types';

const useColonyNetwork = (network: ?Network, wallet: WalletObjectType) => {
  const [colonyClient, setColonyClient] = useState<?ColonyClient>(null);
  const [networkClient, setNetworkClient] = useState<?ColonyNetworkClient>(
    null,
  );

  useEffect(() => {
    (async () => {
      if (network && network.slug === 'goerli' && wallet) {
        if (!networkClient) {
          const client = await getNetworkClient(network.slug, wallet);
          setNetworkClient(client);
        }
        if (networkClient && !colonyClient) {
          const client = await networkClient.getColonyClientByAddress(
            process.env.COLONY_ADDRESS ||
              '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE',
          );
          setColonyClient(client);
        }
      }
    })();
  }, [colonyClient, network, networkClient, wallet]);

  return { colonyClient, networkClient };
};

export default useColonyNetwork;
