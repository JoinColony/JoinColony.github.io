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
  const [colonyError, setClientError] = useState<?string>(null);
  const [networkClient, setNetworkClient] = useState<?ColonyNetworkClient>(
    null,
  );

  useEffect(() => {
    if (
      network &&
      networkClient &&
      network.id !== networkClient.adapter.provider.chainId
    ) {
      setNetworkClient(null);
    }
  }, [network, networkClient]);

  useEffect(() => {
    (async () => {
      if (network && network.slug && wallet && wallet.sign) {
        if (!networkClient) {
          if (network.slug === 'goerli' || network.slug === 'mainnet') {
            await getNetworkClient(network.slug, wallet)
              .then(client => {
                setNetworkClient(client);
              })
              .catch(({ message }) => {
                setClientError(message);
              });
          }
        }
        if (networkClient && !colonyClient) {
          switch (network.slug) {
            case 'goerli':
              if (process.env.COLONY_ADDRESS_GOERLI) {
                networkClient
                  .getColonyClientByAddress(process.env.COLONY_ADDRESS_GOERLI)
                  .then(client => {
                    setColonyClient(client);
                  })
                  .catch(({ message }) => {
                    setClientError(message);
                  });
              }
              setClientError('COLONY_ADDRESS_GOERLI not found');
              break;
            case 'mainnet':
              if (process.env.COLONY_ADDRESS_MAINNET) {
                networkClient
                  .getColonyClientByAddress(process.env.COLONY_ADDRESS_MAINNET)
                  .then(client => {
                    setColonyClient(client);
                  })
                  .catch(({ message }) => {
                    setClientError(message);
                  });
              }
              setClientError('COLONY_ADDRESS_MAINNET not found');
              break;
            default:
              break;
          }
        }
      }
    })();
  }, [colonyClient, network, networkClient, wallet]);

  return { colonyClient, colonyError, networkClient };
};

export default useColonyNetwork;
