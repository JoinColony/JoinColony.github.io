/* @flow */

import type { ColonyClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import {
  COLONY_ROLE_ADMINISTRATION,
  COLONY_ROLE_ROOT,
} from '@colony/colony-js-client';

import { useCallback, useEffect, useState } from 'react';

const useColonyRoles = (
  colonyClient: ?ColonyClient,
  wallet: ?WalletObjectType,
) => {
  const [admin, setAdmin] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [root, setRoot] = useState<boolean>(false);

  const checkRoles = useCallback(async () => {
    if (colonyClient && wallet) {
      const { hasRole: hasRoleRoot } = await colonyClient.hasColonyRole.call({
        address: wallet.address,
        domainId: 1,
        role: COLONY_ROLE_ROOT,
      });
      const { hasRole: hasRoleAdmin } = await colonyClient.hasColonyRole.call({
        address: wallet.address,
        domainId: 1,
        role: COLONY_ROLE_ADMINISTRATION,
      });
      setAdmin(hasRoleAdmin);
      setRoot(hasRoleRoot);
      setLoaded(true);
      setLoading(false);
    }
  }, [colonyClient, wallet]);

  useEffect(() => {
    if (colonyClient && wallet && !loaded) checkRoles();
  }, [checkRoles, colonyClient, loaded, wallet]);

  return { admin, loading, root };
};

export default useColonyRoles;
