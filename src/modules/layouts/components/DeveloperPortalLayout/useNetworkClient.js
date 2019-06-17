/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getNetworkClient } from '@colony/colony-js-client';
import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

const useNetworkClient = (network: ?Network, wallet: WalletObjectType) => {
  const [client, setClient] = useState<?ColonyNetworkClient>(null);
  const [error, setError] = useState<?string>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getClient = useCallback(async () => {
    if (network && supportedNetwork(network) && wallet) {
      setError(null);
      setLoading(true);
      await getNetworkClient(network.slug, wallet)
        .then(result => {
          setClient(result);
          setLoading(false);
        })
        .catch(networkError => {
          setError(networkError.message);
          setLoading(false);
        });
      setLoaded(true);
    }
  }, [network, wallet]);

  const handleChange = useCallback(() => {
    setClient(null);
    setLoaded(false);
  }, []);

  useEffect(() => {
    if (!client && !loaded && !loading) {
      getClient();
    }
  }, [getClient, loaded, loading, client]);

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

  return { error, networkClient: client };
};

export default useNetworkClient;
