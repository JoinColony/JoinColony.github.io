/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import { open } from '@colony/purser-metamask';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

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

  const getNetwork = useCallback(async () => {
    setLoadingNetwork(true);
    const web3 = new Web3(Web3.givenProvider);
    const id = await web3.eth.net.getId();
    const result = getNetworkInfo(id);
    setNetwork(result);
    setLoadedNetwork(true);
    setLoadingNetwork(false);
  }, []);

  const getWallet = useCallback(async () => {
    setLoadingWallet(true);
    const result = await open();
    setWallet(result);
    setLoadedWallet(true);
    setLoadingWallet(false);
  }, []);

  const handleChangeAccount = useCallback(
    ({ networkVersion, selectedAddress }) => {
      if (!selectedAddress) {
        setWallet(null);
      } else if (!wallet || (wallet && selectedAddress !== wallet.address)) {
        getWallet();
      }
      if (network && networkVersion !== network.id.toString()) {
        getNetwork();
      }
    },
    [getNetwork, getWallet, network, wallet],
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
    const web3 = new Web3(Web3.givenProvider);
    if (!loadedNetwork && !loadingNetwork && web3 && web3.currentProvider) {
      getNetwork();
    }
  }, [getNetwork, loadedNetwork, loadingNetwork]);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider);
    if (
      network &&
      web3 &&
      web3.currentProvider &&
      web3.currentProvider.connection.networkVersion !== network.id.toString()
    ) {
      getNetwork();
    }
  }, [getNetwork, network]);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider);
    if (!web3.currentProvider) {
      setNetwork(null);
      setWallet(null);
    }
    if (!loadingWallet && web3 && web3.currentProvider) {
      // eslint-disable-next-line no-underscore-dangle
      web3.currentProvider.connection.publicConfigStore._events.update.push(
        handleChangeAccount,
      );
    }
    return () => {
      if (!loadingWallet && web3 && web3.currentProvider) {
        // eslint-disable-next-line no-underscore-dangle
        web3.currentProvider.connection.publicConfigStore._events.update.pop(
          handleChangeAccount,
        );
      }
    };
  }, [handleChangeAccount, loadingWallet]);

  return { network, loadedNetwork, wallet };
};

export default useMetaMask;
