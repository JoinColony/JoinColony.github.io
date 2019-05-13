/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { User } from '~types';

import { getStore, setStore } from './localStorage';

const getUser = (setUser, setError, user) => {
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
      if (data.error) {
        setError(data.error);
        setUser(null);
      } else {
        setUser(data.user);
      }
    })
    .catch(error => {
      setError(error);
    });
};

const useServer = () => {
  const [error, setError] = useState<?string>(null);
  const [fetched, setFetched] = useState<?boolean>(false);
  const [socket, setSocket] = useState<?Socket>(null);
  const [user, setUser] = useState<?User>(null);

  useEffect(() => setUser(getStore('user')), []);
  useEffect(() => setStore('user', user), [user]);

  useEffect(() => {
    if (!fetched && user) {
      getUser(setUser, setError, user);
      setFetched(true);
    }
  }, [fetched, user]);

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

  return { error, setUser, socket, user };
};

export default useServer;
