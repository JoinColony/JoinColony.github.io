/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { User } from '~types';

import { getStore, setStore } from './localStorage';

const useServer = () => {
  const [user, setUser] = useState<?User>(null);
  const [socket, setSocket] = useState<?Socket>(null);

  useEffect(() => setUser(getStore('user')), []);
  useEffect(() => setStore('user', user), [user]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io.connect(
        process.env.SOCKET || 'http://localhost:8080',
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

  return { setUser, socket, user };
};

export default useServer;
