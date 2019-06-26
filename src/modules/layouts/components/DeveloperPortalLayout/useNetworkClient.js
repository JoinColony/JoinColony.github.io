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

  return { error, networkClient: client };
};

export default useNetworkClient;
