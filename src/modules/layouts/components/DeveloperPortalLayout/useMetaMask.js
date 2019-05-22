/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import { open } from '@colony/purser-metamask';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

import type { Network, User } from '~types';

import { getStore, setStore } from './localStorage';

const web3 = new Web3();

const getNetworkInfo = (id: number) => {
  switch (id) {
    case 1:
      return {
        id,
        name: 'Main Ethereum Network',
        color: '#29b6af',
      };
    case 3:
      return {
        id,
        name: 'Ropsten Test Network',
        color: '#ff4a8d',
      };
    case 4:
      return {
        id,
        name: 'Rinkeby Test Network',
        color: '#f6c343',
      };
    case 5:
      return {
        id,
        name: 'Goerli Test Network',
        color: '#3099f2',
      };
    case 42:
      return {
        id,
        name: 'Kovan Test Network',
        color: '#7057ff',
      };
    default:
      return {
        id,
        name: 'Private Test Network',
        color: '#ffffff',
      };
  }
};

const useMetaMask = (dashboard: boolean, setUser: (user: ?User) => void) => {
  const [loadedLocal, setLoadedLocal] = useState<?boolean>(false);
  const [loadedNetwork, setLoadedNetwork] = useState<boolean>(false);
  const [loadedWallet, setLoadedWallet] = useState<boolean>(false);
  const [loadingWallet, setLoadingWallet] = useState<boolean>(false);
  const [network, setNetwork] = useState<?Network>(null);
  const [wallet, setWallet] = useState<?WalletObjectType>(null);

  const openWallet = useCallback(async () => {
    setLoadingWallet(true);
    const result = await open();
    setStore('wallet', result);
    setWallet(result);
    setLoadingWallet(false);
  }, []);

  const getNetwork = useCallback(async () => {
    web3.setProvider(web3.givenProvider);
    const id = await web3.eth.net.getId();
    const result = getNetworkInfo(id);
    setNetwork(result);
  }, []);

  const handleChangeAccount = useCallback(
    metamask => {
      if (!metamask.selectedAddress) {
        setStore('wallet', null);
        setWallet(null);
        setUser(null);
      } else if (wallet && metamask.selectedAddress !== wallet.address) {
        openWallet();
      }
      if (network && metamask.networkVersion !== network.id.toString()) {
        getNetwork();
      }
    },
    [getNetwork, network, openWallet, setUser, wallet],
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
    if (dashboard && !loadedWallet) {
      openWallet();
      setLoadedWallet(true);
    }
  }, [dashboard, loadedWallet, openWallet]);

  useEffect(() => {
    if (dashboard && !loadedNetwork && loadedWallet) {
      getNetwork();
      setLoadedNetwork(true);
    }
  }, [dashboard, getNetwork, loadedNetwork, loadedWallet]);

  useEffect(() => {
    if (!loadingWallet && wallet && web3.currentProvider) {
      // eslint-disable-next-line no-underscore-dangle
      web3.currentProvider.publicConfigStore._events.update.push(
        handleChangeAccount,
      );
    }
    return () => {
      if (web3.currentProvider) {
        // eslint-disable-next-line no-underscore-dangle
        web3.currentProvider.publicConfigStore._events.update.pop(
          handleChangeAccount,
        );
      }
    };
  }, [handleChangeAccount, loadingWallet, wallet]);

  return { network, wallet };
};

export default useMetaMask;
