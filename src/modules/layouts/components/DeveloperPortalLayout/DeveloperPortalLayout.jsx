/* @flow */
import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, {
  Component,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Web3 from 'web3';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import Header from './Header';
import Footer from './Footer';

import styles from './DeveloperPortalLayout.module.css';

type Props = {|
  children: Element<typeof Component>,
  intl: IntlShape,
|};

const web3 = new Web3();

const displayName = 'layouts.DeveloperPortalLayout';

const DeveloperPortalLayout = ({ children, intl: { locale } }: Props) => {
  const [github, setGitHub] = useState(false);
  const [network, setNetwork] = useState(undefined);
  const [wallet, setWallet] = useState(false);

  useEffect(() => {
    const getNetwork = async () => {
      web3.setProvider(web3.givenProvider);
      const result = await web3.eth.net.getNetworkType();
      setNetwork(result);
    };
    getNetwork();
  }, []);

  const projectQueryData = useStaticQuery(graphql`
    {
      ...coreProjectsFragment
      ...openSourceProjectsFragment
    }
  `);
  const coreProjects: Array<Project> =
    projectQueryData.coreProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];
  const openSourceProjects: Array<Project> =
    projectQueryData.openSourceProjects.edges.map(edge =>
      transformProjectData(edge, locale),
    ) || [];

  let dashboard = false;
  if (typeof window !== 'undefined') {
    dashboard = window.location.pathname.split('/')[1] === 'dashboard';
  }

  return (
    <>
      <Header
        coreProjects={coreProjects}
        dashboard={dashboard}
        github={github}
        network={network}
        openSourceProjects={openSourceProjects}
        wallet={wallet}
      />
      <div className={styles.body}>
        {isValidElement(children)
          ? cloneElement(children, { setGitHub, setWallet })
          : children}
      </div>
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
