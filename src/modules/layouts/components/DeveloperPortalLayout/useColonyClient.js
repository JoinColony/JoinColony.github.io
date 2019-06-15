/* @flow */

import type {
  ColonyClient,
  ColonyNetworkClient,
} from '@colony/colony-js-client';

import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

const getColonyAddress = (networkId: number) => {
  switch (networkId) {
    case 1:
      return process.env.COLONY_ADDRESS_MAINNET;
    case 5:
      return process.env.COLONY_ADDRESS_GOERLI;
    default:
      return null;
  }
};

const useColonyClient = (
  network: ?Network,
  networkClient: ?ColonyNetworkClient,
) => {
  const [client, setClient] = useState<?ColonyClient>(null);
  const [error, setError] = useState<?string>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getClient = useCallback(async () => {
    if (network && networkClient) {
      setError(null);
      setLoading(true);
      const colonyAddress = getColonyAddress(network.id);
      if (colonyAddress) {
        networkClient
          .getColonyClientByAddress(colonyAddress)
          .then(result => {
            setClient(result);
            setLoading(false);
          })
          .catch(colonyError => {
            setError(colonyError.message);
            setLoading(false);
          });
      } else {
        setError('Unsupported network');
      }
      setLoaded(true);
    }
  }, [network, networkClient]);

  useEffect(() => {
    if (!client && !loaded && !loading) {
      getClient();
    }
  }, [client, getClient, loaded, loading]);

  useEffect(() => {
    if (
      !error &&
      !loading &&
      client &&
      network &&
      client.adapter.provider.chainId !== network.id
    ) {
      getClient();
    }
  }, [client, error, getClient, loading, network]);

  return { colonyClient: client };
};

export default useColonyClient;
