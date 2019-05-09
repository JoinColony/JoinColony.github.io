/* @flow */

import type { Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import type { Discourse, GitHub } from '~types';

import { getCachedItem, setCachedItem } from './localStorage';

const useAuthServer = () => {
  const [discourse, setDiscourse] = useState<?Discourse>(null);
  const [github, setGitHub] = useState<?GitHub>(null);
  const [socket, setSocket] = useState<?Socket>(null);

  useEffect(() => setDiscourse(getCachedItem('discourse')), []);
  useEffect(() => setGitHub(getCachedItem('github')), []);

  useEffect(() => setCachedItem('discourse', discourse), [discourse]);
  useEffect(() => setCachedItem('github', github), [github]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io.connect(
        process.env.SOCKET || 'http://localhost:8080',
      );
      newSocket.on('discourse', setDiscourse);
      newSocket.on('github', setGitHub);
      setSocket(newSocket);
    }
    return () => {
      if (socket) {
        socket.off('discourse', setDiscourse);
        socket.off('github', setGitHub);
        socket.disconnect();
      }
    };
  }, [socket]);

  return {
    discourse,
    github,
    setDiscourse,
    setGitHub,
    socket,
  };
};

export default useAuthServer;
