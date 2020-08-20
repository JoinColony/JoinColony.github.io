/* @flow */

import type { Element } from 'react';
import type { IntlShape } from 'react-intl';

import React, { Component } from 'react';

import { useDocsLinks } from '~hooks';

import Header from './Header';
import Footer from './Footer';

import './DeveloperPortalLayout.module.css';

type Props = {|
  children: Element<typeof Component>,
  intl: IntlShape,
|};

const displayName = 'layouts.DeveloperPortalLayout';

const DeveloperPortalLayout = ({ children, intl }: Props) => {
  const { coreProjects, openSourceProjects } = useDocsLinks(intl);

  return (
    <div>
      <Header
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
      {children}
      <Footer
        coreProjects={coreProjects}
        openSourceProjects={openSourceProjects}
      />
    </div>
  );
};

DeveloperPortalLayout.displayName = displayName;

export default DeveloperPortalLayout;
