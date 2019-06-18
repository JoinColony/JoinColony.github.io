/* @flow */

import type {
  ColonyClient,
  ColonyNetworkClient,
} from '@colony/colony-js-client';

import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

const getColonyAddress = (networkId: number) => {
  switch (networkId) {
    case 1:
      return process.env.COLONY_ADDRESS_MAINNET || '0x0';
    case 5:
      return process.env.COLONY_ADDRESS_GOERLI || '0x0';
    default:
      return '0x0';
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
    if (network && supportedNetwork(network) && networkClient) {
      setError(null);
      setLoading(true);
      const colonyAddress = getColonyAddress(network.id);
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
      setLoaded(true);
    }
  }, [network, networkClient]);

  const handleChange = useCallback(() => {
    setClient(null);
    setLoaded(false);
  }, []);

  useEffect(() => {
    if (!client && !loaded && !loading) {
      getClient();
    }
  }, [client, getClient, loaded, loading]);

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('networkChanged', handleChange);
    }
    if (window && window.ethereum) {
      window.ethereum.on('accountsChanged', handleChange);
    }
    return () => {
      if (window && window.ethereum) {
        window.ethereum.off('networkChanged', handleChange);
      }
      if (window && window.ethereum) {
        window.ethereum.off('accountsChanged', handleChange);
      }
    };
  }, [handleChange]);

  return { colonyClient: client, error };
};

export default useColonyClient;
