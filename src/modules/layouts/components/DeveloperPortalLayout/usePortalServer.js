/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { User } from '~types';

import { getStore, setStore } from './localStorage';

const server = process.env.SERVER_URL || 'http://localhost:8080';

const usePortalServer = () => {
  const [error, setError] = useState<?string>(null);
  const [loadedLocal, setLoadedLocal] = useState<?boolean>(false);
  const [loadedUser, setLoadedUser] = useState<?boolean>(false);
  const [socket, setSocket] = useState<?Socket>(null);
  const [user, setUser] = useState<?User>(null);

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
            setError(data.error);
            setUser(null);
          } else {
            setUser(data.user);
          }
        })
        .catch(err => {
          setError(err);
        });
      setLoadedUser(true);
    }
  }, [loadedUser, user]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io.connect(
        process.env.SOCKET_URL || 'http://localhost:8080',
      );
      newSocket.on('discourse', setUser);
      newSocket.on('github', setUser);
      setSocket(newSocket);
    }
    return () => {
      if (socket) {
        socket.off('discourse', setUser);
        socket.off('github', setUser);
        socket.disconnect();
      }
    };
  }, [socket]);

  return { error, setUser, socket, user };
};

export default usePortalServer;
