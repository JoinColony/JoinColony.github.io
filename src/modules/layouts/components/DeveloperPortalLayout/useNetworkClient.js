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
    const validInputs = supportedNetwork(network) && wallet;
    if (!client && !error && !loading && validInputs) {
      getClient();
    }
  }, [client, error, getClient, loading, network, wallet]);

  useEffect(() => {
    const networkMismatch =
      client && network && client.network !== network.slug;
    const walletMismatch =
      // $FlowFixMe - Property address is missing in Wallet
      client && wallet && client.adapter.wallet.address !== wallet.address;
    if (
      client &&
      !error &&
      !loading &&
      (!network || !wallet || networkMismatch || walletMismatch)
    ) {
      setClient(null);
    }
  }, [client, error, loading, network, wallet]);

  return { networkClient: client };
};

export default useNetworkClient;
