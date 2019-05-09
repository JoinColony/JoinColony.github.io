/* @flow */

import { open } from '@colony/purser-metamask';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';

import { getCachedItem, setCachedItem } from './localStorage';

const web3 = new Web3();

const useMetaMask = () => {
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => setWallet(getCachedItem('network')), []);
  useEffect(() => setWallet(getCachedItem('wallet')), []);

  useEffect(() => setCachedItem('network', network), [network]);
  useEffect(() => setCachedItem('wallet', wallet), [wallet]);

  const openWallet = useCallback(async () => {
    setLoading(true);
    const result = await open();
    setWallet(result);
    setCachedItem('wallet', result);
    setLoading(false);
  }, []);

  useEffect(() => {
    openWallet();
  }, [openWallet]);

  const accountChangedCallback = useCallback(
    metamask => {
      if (wallet && !loading && !metamask.selectedAddress) {
        setWallet(null);
        setCachedItem('wallet', null);
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
        const result = await web3.eth.net.getNetworkType();
        setNetwork(result);
      };
      getNetwork();
    }
  }, []);

  return { network, wallet };
};

export default useMetaMask;
