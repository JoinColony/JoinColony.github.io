/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getNetworkClient } from '@colony/colony-js-client';
import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

const useNetworkClient = (
  loadedNetwork: boolean,
  network: ?Network,
  wallet: WalletObjectType,
) => {
  const [client, setClient] = useState<?ColonyNetworkClient>(null);
  const [error, setError] = useState<?string>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getClient = useCallback(async () => {
    if (loadedNetwork && network && wallet) {
      setError(null);
      setLoading(true);
      if (supportedNetwork(network)) {
        await getNetworkClient(network.slug, wallet)
          .then(result => {
            setClient(result);
            setLoading(false);
          })
          .catch(networkError => {
            setError(networkError.message);
            setLoading(false);
          });
      } else {
        setError('Unsupported network');
      }
      setLoaded(true);
    }
  }, [network, loadedNetwork, wallet]);

  useEffect(() => {
    if (!client && !loaded && !loading) {
      getClient();
    }
  }, [getClient, loaded, loading, client]);

  useEffect(() => {
    if (
      !error &&
      !loading &&
      client &&
      network &&
      client.adapter.provider.chainId !== network.id
    ) {
      setClient(null);
      setLoaded(false);
    }
  }, [client, error, getClient, loading, network]);

  return { networkClient: client };
};

export default useNetworkClient;
