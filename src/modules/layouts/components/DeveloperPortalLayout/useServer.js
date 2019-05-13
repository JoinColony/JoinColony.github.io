/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { User } from '~types';

import { getStore, setStore } from './localStorage';

const getUser = (setUser, setUserError, user) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // eslint-disable-next-line no-undef
  fetch(`http://localhost:8080/api/user?sessionID=${user.session.id}`, options)
    .then(response => response.json())
    .then(data => {
      setUser(data.user);
    })
    .catch(message => {
      setUserError(message);
    });
};

const useServer = () => {
  const [userError, setUserError] = useState<?string>(null);
  const [socket, setSocket] = useState<?Socket>(null);
  const [user, setUser] = useState<?User>(null);
  const [userFetched, setUserFetched] = useState<?boolean>(false);

  useEffect(() => setUser(getStore('user')), []);
  useEffect(() => setStore('user', user), [user]);

  useEffect(() => {
    if (!userFetched && user) {
      getUser(setUser, setUserError, user);
      setUserFetched(true);
    }
  }, [userFetched, user]);

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

  return { setUser, socket, user, userError };
};

export default useServer;
