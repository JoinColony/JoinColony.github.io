/* @flow */
import type { Node } from 'react';
import type { IntlShape } from 'react-intl';

import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Web3 from 'web3';

import type { Project } from '~types';

import { transformProjectData } from '~utils/docs';

import Header from './Header';
import Footer from './Footer';

import styles from './DeveloperPortalLayout.module.css';

type Props = {|
  children: Node,
  intl: IntlShape,
|};

const web3 = new Web3();

const displayName = 'layouts.DeveloperPortalLayout';

const DeveloperPortalLayout = ({ children, intl: { locale } }: Props) => {
  const [network, setNetwork] = useState(undefined);
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
  return (
    <>
      <Header
        coreProjects={coreProjects}
        network={network}
        openSourceProjects={openSourceProjects}
      />
      <div className={styles.body}>{children}</div>
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
