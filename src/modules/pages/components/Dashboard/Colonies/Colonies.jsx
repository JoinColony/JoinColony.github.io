/* @flow */
/* eslint-disable react/no-unused-prop-types */

import type { ColonyNetworkClient } from '@colony/colony-js-client';
import type { WalletObjectType } from '@colony/purser-core';

import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Network, User } from '~types';

import Button from '~core/Button';
import Link from '~core/Link';

import AddColony from './AddColony';
import ColonyItem from './ColonyItem';

import styles from './Colonies.module.css';

const MSG = defineMessages({
  buttonAddColony: {
    id: 'pages.Dashboard.Colonies.AddColony.buttonAddColony',
    defaultMessage: '+ Add Colony',
  },
  buttonCancel: {
    id: 'pages.Dashboard.Colonies.AddColony.buttonCancel',
    defaultMessage: 'Cancel',
  },
  mainTitle: {
    id: 'pages.Dashboard.Colonies.mainTitle',
    defaultMessage: 'Colonies List',
  },
  mainDescription: {
    id: 'pages.Dashboard.Colonies.mainDescription',
    defaultMessage: `A list of colonies that you are tracking on {network}.`,
  },
  emptyTitle: {
    id: 'pages.Dashboard.Colonies.emptyTitle',
    defaultMessage: `You haven't added any colonies yet!`,
  },
  emptyDescription: {
    id: 'pages.Dashboard.Colonies.emptyDescription',
    defaultMessage: `Keep track of colonies on {network} or switch to another
    network.`,
  },
  emptyCreateColony: {
    id: 'pages.Dashboard.Colonies.emptyCreateColony',
    defaultMessage: 'Create Colony',
  },
  emptyCreateColonyDescription: {
    id: 'pages.Dashboard.Colonies.emptyCreateColonyDescription',
    defaultMessage: `If you would like to create a colony, check out
    {linkGetStarted}.`,
  },
  emptyAddColony: {
    id: 'pages.Dashboard.Colonies.emptyAddColony',
    defaultMessage: 'Add Colony',
  },
  emptyAddColonyDescription: {
    id: 'pages.Dashboard.Colonies.emptyAddColonyDescription',
    defaultMessage: `If you created a colony or you have the address of another
    colony that you would like to track, add the address to your personalized
    list of colonies.`,
  },
  learnMoreTitle: {
    id: 'pages.Dashboard.Colonies.learnMoreTitle',
    defaultMessage: 'Learn More',
  },
  linkColonyRoles: {
    id: 'pages.Dashboard.Colonies.linkColonyRoles',
    defaultMessage: 'Colony Roles',
  },
  linkDomainsAndSkills: {
    id: 'pages.Dashboard.Colonies.linkDomainsAndSkills',
    defaultMessage: 'Domains and Skills',
  },
  linkGetStarted: {
    id: 'pages.Dashboard.Colonies.linkGetStarted',
    defaultMessage: 'Get Started',
  },
  linkTasksAndPayments: {
    id: 'pages.Dashboard.Colonies.linkTasksAndPayments',
    defaultMessage: 'Tasks and Payments',
  },
  linkTokensAndFunding: {
    id: 'pages.Dashboard.Colonies.linkTokensAndFunding',
    defaultMessage: 'Tokens and Funding',
  },
  unsupportedNetworkTitle: {
    id: 'pages.Dashboard.Colonies.unsupportedNetworkTitle',
    defaultMessage: 'Nothing to see here!',
  },
  unsupportedNetworkMessage: {
    id: 'pages.Dashboard.Colonies.unsupportedNetworkMessage',
    defaultMessage: `Either the colonyNetwork smart contracts are not deployed
    to this network or you are using a local network that is not supported. Use
    MetaMask to switch to "Goerli Test Network" or "Main Ethereum Network".`,
  },
});

type Props = {|
  network: Network,
  networkClient: ?ColonyNetworkClient,
  path: string,
  setUser: (user: User) => void,
  user: User,
  wallet: WalletObjectType,
|};

const displayName = 'pages.Dashboard.Colonies';

const Colonies = ({ network, networkClient, setUser, user, wallet }: Props) => {
  const [addColony, setAddColony] = useState(false);
  const supportedNetwork =
    network && (network.slug === 'mainnet' || network.slug === 'goerli');
  const coloniesExist =
    user.colonies &&
    user.colonies[network.slug] &&
    user.colonies[network.slug].length;
  if (!supportedNetwork) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            <FormattedMessage {...MSG.unsupportedNetworkTitle} />
          </h1>
          <p className={styles.subTitle}>
            <FormattedMessage {...MSG.unsupportedNetworkMessage} />
          </p>
          <div className={styles.content} />
        </div>
      </div>
    );
  }
  if (!coloniesExist) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>
            <FormattedMessage {...MSG.emptyTitle} />
          </h1>
          <p className={styles.subTitle}>
            <FormattedMessage
              values={{ network: network.name }}
              {...MSG.emptyDescription}
            />
          </p>
          <div className={styles.content}>
            <div className={styles.emptyItem}>
              <h4 className={styles.emptyItemTitle}>
                <FormattedMessage {...MSG.emptyCreateColony} />
              </h4>
              <p>
                <FormattedMessage
                  values={{
                    linkGetStarted: (
                      <Link
                        href="/colonyjs/intro-get-started"
                        text={MSG.linkGetStarted}
                      />
                    ),
                  }}
                  {...MSG.emptyCreateColonyDescription}
                />
              </p>
            </div>
            <div className={styles.emptyItem}>
              <h4 className={styles.emptyItemTitle}>
                <FormattedMessage {...MSG.emptyAddColony} />
              </h4>
              <p>
                <FormattedMessage
                  values={{ network: network.name }}
                  {...MSG.emptyAddColonyDescription}
                />
              </p>
            </div>
            <AddColony
              network={network}
              networkClient={networkClient}
              setUser={setUser}
              setAddColony={setAddColony}
              user={user}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h1 className={styles.title}>
          <FormattedMessage {...MSG.mainTitle} />
        </h1>
        <p className={styles.subTitle}>
          <FormattedMessage
            values={{ network: network.name }}
            {...MSG.mainDescription}
          />
        </p>
        <div className={styles.content}>
          <div className={styles.addColonyButton}>
            {addColony ? (
              <Button
                appearance={{
                  theme: 'reset',
                  color: 'grey',
                }}
                onClick={() => setAddColony(false)}
                text={MSG.buttonCancel}
                type="submit"
              />
            ) : (
              <Button
                appearance={{
                  theme: 'reset',
                  color: 'blue',
                }}
                onClick={() => setAddColony(true)}
                text={MSG.buttonAddColony}
                type="submit"
              />
            )}
          </div>
          {addColony && (
            <AddColony
              network={network}
              networkClient={networkClient}
              setUser={setUser}
              setAddColony={setAddColony}
              user={user}
            />
          )}
          {user.colonies &&
            user.colonies[network.slug] &&
            user.colonies[network.slug].map(colonyAddress => (
              <ColonyItem
                key={colonyAddress}
                colonyAddress={colonyAddress}
                network={network}
                networkClient={networkClient}
                wallet={wallet}
              />
            ))}
        </div>
      </div>
      <div className={styles.learnMore}>
        <h4>
          <FormattedMessage {...MSG.learnMoreTitle} />
        </h4>
        <Link
          arrow="right"
          href="/colonyjs/intro-get-started"
          text={MSG.linkGetStarted}
        />
        <Link
          arrow="right"
          href="/colonyjs/topics-colony-roles"
          text={MSG.linkColonyRoles}
        />
        <Link
          arrow="right"
          href="/colonyjs/topics-tokens-and-funding"
          text={MSG.linkTokensAndFunding}
        />
        <Link
          arrow="right"
          href="/colonyjs/topics-domains-and-skills"
          text={MSG.linkDomainsAndSkills}
        />
        <Link
          arrow="right"
          href="/colonyjs/topics-tasks-and-payments"
          text={MSG.linkTasksAndPayments}
        />
      </div>
    </div>
  );
};

Colonies.displayName = displayName;

export default Colonies;
