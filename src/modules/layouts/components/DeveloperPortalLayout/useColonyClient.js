/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getColonyClient } from '@colony/colony-js-client';
import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

const getColonyAddress = (networkId: number) => {
  switch (networkId) {
    case 1:
      return (
        process.env.COLONY_ADDRESS_MAINNET ||
        '0x84bc20B584fA28a278B7a8d5D1Ec5c71224c9f7C'
      );
    case 5:
      return (
        process.env.COLONY_ADDRESS_GOERLI ||
        '0x0a97cb5A59085C0d5903622b3635D107Ab8F20AE'
      );
    default:
      return '0x0';
  }
};

const useColonyClient = (network: ?Network, wallet: WalletObjectType) => {
  const [client, setClient] = useState<?ColonyClient>(null);
  const [error, setError] = useState<?string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getClient = useCallback(async () => {
    if (network && supportedNetwork(network) && wallet) {
      setError(null);
      setLoading(true);
      const colonyAddress = getColonyAddress(network.id);
      await getColonyClient(colonyAddress, network.slug, wallet)
        .then(result => {
          setClient(result);
          setLoading(false);
        })
        .catch(clientError => {
          setError(clientError.message);
          setLoading(false);
        });
    }
  }, [network, wallet]);

  useEffect(() => {
    if (!client && !loading) {
      getClient();
    }
  }, [client, getClient, loading]);

  useEffect(() => {
    if (!network || !wallet) {
      setClient(null);
    }
  }, [network, wallet]);

  return { colonyClient: client, error };
};

export default useColonyClient;
