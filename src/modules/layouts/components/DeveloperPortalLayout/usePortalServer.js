/* @flow */

import type { Socket } from 'socket.io-client';
import type { WalletObjectType } from '@colony/purser-core';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { Provider, User } from '~types';

import { getStore, setStore } from './localStorage';

const server = process.env.SERVER_URL || 'https://chora.io';

const usePortalServer = (wallet: WalletObjectType) => {
  const [loadedLocal, setLoadedLocal] = useState<?boolean>(false);
  const [loadedUser, setLoadedUser] = useState<?boolean>(false);
  const [serverError, setServerError] = useState<?string>(null);
  const [socket, setSocket] = useState<?Socket>(null);
  const [user, setUser] = useState<?User>(null);

  const authenticate = (provider: Provider) => {
    setServerError(null);
    if (socket && wallet) {
      const url = `${server}/auth/${provider}/`;
      const params = `?socketId=${socket.id}&address=${wallet.address}`;
      if (typeof window !== 'undefined') window.open(url + params);
    }
  };

  const disconnect = (provider: Provider) => {
    setServerError(null);
    if (setUser && provider === 'discourse') {
      setUser({ ...user, discourse: null });
    }
    if (setUser && provider === 'github') {
      setUser(null);
    }
  };

  useEffect(() => {
    if (!loadedLocal) {
      const localUser = getStore('user');
      setUser(localUser);
      setLoadedLocal(true);
    }
  }, [loadedLocal]);

  useEffect(() => setStore('user', user), [user]);

  useEffect(() => {
    if (!loadedUser && user) {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      // eslint-disable-next-line no-undef
      fetch(`${server}/api/user?sessionID=${user.session.id}`, options)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setServerError(data.error);
            setUser(null);
          } else {
            setUser(data.user);
          }
        })
        .catch(err => {
          setServerError(err);
        });
      setLoadedUser(true);
    }
  }, [loadedUser, user]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io.connect(
        process.env.SOCKET_URL || 'https://chora.io:8000',
        { secure: true },
      );
      newSocket.on('discourse', setUser);
      newSocket.on('github', setUser);
      newSocket.on('error', setServerError);
      setSocket(newSocket);
    }
    return () => {
      if (socket) {
        socket.off('discourse', setUser);
        socket.off('github', setUser);
        socket.off('error', setServerError);
        socket.disconnect();
      }
    };
  }, [socket]);

  return { authenticate, disconnect, serverError, setUser, socket, user };
};

export default usePortalServer;
