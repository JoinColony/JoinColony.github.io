/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import { open } from '@colony/purser-metamask';
import { useCallback, useEffect, useState } from 'react';

import type { Network } from '~types';

import { getStore, setStore } from './localStorage';

const getNetworkInfo = (id: number) => {
  switch (id) {
    case 1:
      return {
        id,
        name: 'Main Ethereum Network',
        slug: 'mainnet',
        color: '#29b6af',
      };
    case 3:
      return {
        id,
        name: 'Ropsten Test Network',
        slug: 'ropsten',
        color: '#ff4a8d',
      };
    case 4:
      return {
        id,
        name: 'Rinkeby Test Network',
        slug: 'rinkeby',
        color: '#f6c343',
      };
    case 5:
      return {
        id,
        name: 'Goerli Test Network',
        slug: 'goerli',
        color: '#3099f2',
      };
    case 42:
      return {
        id,
        name: 'Kovan Test Network',
        slug: 'kovan',
        color: '#7057ff',
      };
    default:
      return {
        id,
        name: 'Private Test Network',
        slug: 'private',
        color: '#ffffff',
      };
  }
};

const useMetaMask = (walletRequired: boolean) => {
  const [loadedLocal, setLoadedLocal] = useState<?boolean>(false);
  const [loadedNetwork, setLoadedNetwork] = useState<boolean>(false);
  const [loadedWallet, setLoadedWallet] = useState<boolean>(false);
  const [loadingNetwork, setLoadingNetwork] = useState<boolean>(false);
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);
  const [network, setNetwork] = useState<?Network>(null);
  const [wallet, setWallet] = useState<?WalletObjectType>(null);

  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
  }

  const getNetwork = useCallback(async () => {
    if (window && window.ethereum) {
      setLoadingNetwork(true);
      const networkId = Number(window.ethereum.networkVersion);
      const result = getNetworkInfo(networkId);
      setNetwork(result);
      setLoadedNetwork(true);
      setLoadingNetwork(false);
    }
  }, []);

  const getWallet = useCallback(async () => {
    setLoadingWallet(true);
    const result = await open();
    setWallet(result);
    setLoadedWallet(true);
    setLoadingWallet(false);
  }, []);

  const handleAccountsChanged = useCallback(
    accounts => {
      if (!accounts.length) {
        setWallet(null);
      } else if (wallet && accounts[0] !== wallet.address) {
        getWallet();
      }
    },
    [getWallet, wallet],
  );

  const handleNetworkChanged = useCallback(
    id => {
      if (network && id !== network.id.toString()) {
        setLoadedNetwork(false);
        getNetwork();
      }
    },
    [getNetwork, network],
  );

  useEffect(() => {
    if (!loadedLocal) {
      const localNetwork = getStore('network');
      const localWallet = getStore('wallet');
      setNetwork(localNetwork);
      setWallet(localWallet);
      setLoadedLocal(true);
    }
  }, [loadedLocal]);

  useEffect(() => setStore('network', network), [network]);
  useEffect(() => setStore('wallet', wallet), [wallet]);

  useEffect(() => {
    if (!loadedWallet && !loadingWallet && walletRequired) {
      getWallet();
    }
  }, [getWallet, loadedWallet, loadingWallet, walletRequired]);

  useEffect(() => {
    if (!loadedNetwork && !loadingNetwork) {
      getNetwork();
    }
  }, [getNetwork, loadedNetwork, loadingNetwork]);

  useEffect(() => {
    if (window && window.ethereum) {
      window.ethereum.on('networkChanged', handleNetworkChanged);
    }
    if (window && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    if (window && !window.ethereum) {
      setNetwork(null);
    }
    return () => {
      if (window && window.ethereum) {
        window.ethereum.off('networkChanged', handleNetworkChanged);
      }
      if (window && window.ethereum) {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      }
    };
  }, [handleAccountsChanged, handleNetworkChanged]);

  return { network, wallet };
};

export default useMetaMask;
