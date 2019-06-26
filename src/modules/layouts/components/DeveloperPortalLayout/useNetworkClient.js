/* @flow */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import { getNetworkClient } from '@colony/colony-js-client';
import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { supportedNetwork } from '~layouts/DeveloperPortalLayout/helpers';

const useNetworkClient = (network: ?Network, wallet: ?WalletObjectType) => {
  const [client, setClient] = useState<?ColonyNetworkClient>(null);
  const [error, setError] = useState<?string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getClient = useCallback(async () => {
    if (network) {
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
    if (
      network &&
      supportedNetwork(network) &&
      wallet &&
      !client &&
      !error &&
      !loading
    ) {
      getClient();
    }
  }, [client, error, getClient, loading, network, wallet]);

  useEffect(() => {
    if (
      client &&
      !error &&
      !loading &&
      (!network ||
        !wallet ||
        (network && client.network !== network.slug) ||
        // $FlowFixMe - Property address is missing in Wallet
        (wallet && client.adapter.wallet.address !== wallet.address))
    ) {
      setClient(null);
    }
  }, [client, error, loading, network, wallet]);

  return { networkClient: client };
};

export default useNetworkClient;
