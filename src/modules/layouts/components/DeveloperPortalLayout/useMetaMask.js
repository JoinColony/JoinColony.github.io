/* @flow */

import type { WalletObjectType } from '@colony/purser-core';

import { open } from '@colony/purser-metamask';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

import type { Network } from '~types';

import { getStore, setStore } from './localStorage';

const web3 = new Web3();

const getNetworkInfo = id => {
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

const useMetaMask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [network, setNetwork] = useState<?Network>(null);
  const [wallet, setWallet] = useState<?WalletObjectType>(null);

  useEffect(() => setWallet(getStore('network')), []);
  useEffect(() => setWallet(getStore('wallet')), []);

  useEffect(() => setStore('network', network), [network]);
  useEffect(() => setStore('wallet', wallet), [wallet]);

  const openWallet = useCallback(async () => {
    setLoading(true);
    const result = await open();
    setWallet(result);
    setStore('wallet', result);
    setLoading(false);
  }, []);

  useEffect(() => {
    openWallet();
  }, [openWallet]);

  const accountChangedCallback = useCallback(
    metamask => {
      if (wallet && !loading && !metamask.selectedAddress) {
        setWallet(null);
        setStore('wallet', null);
      } else if (
        wallet &&
        !loading &&
        metamask.selectedAddress &&
        metamask.selectedAddress !== wallet.address
      ) {
        openWallet();
      }
    },
    [loading, openWallet, wallet],
  );

  useEffect(() => {
    (async () => {
      if (web3.currentProvider) {
        // eslint-disable-next-line no-underscore-dangle
        web3.currentProvider.publicConfigStore._events.update.push(
          accountChangedCallback,
        );
      }
    })();
    return () => {
      if (web3.currentProvider) {
        // eslint-disable-next-line no-underscore-dangle
        web3.currentProvider.publicConfigStore._events.update.pop(
          accountChangedCallback,
        );
      }
    };
  }, [accountChangedCallback]);

  useEffect(() => {
    if (web3.givenProvider) {
      const getNetwork = async () => {
        web3.setProvider(web3.givenProvider);
        const result = await web3.eth.net.getId();
        const networkInfo = getNetworkInfo(result);
        setNetwork(networkInfo);
      };
      getNetwork();
    }
  }, []);

  return { network, wallet };
};

export default useMetaMask;
