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
  mainTitle: {
    id: 'pages.Dashboard.Colonies.mainTitle',
    defaultMessage: 'Colonies List',
  },
  mainDescription: {
    id: 'pages.Dashboard.Colonies.mainDescription',
    defaultMessage: `A list of colonies that you follow on {network}.`,
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
    {emptyCreateColonyLink}.`,
  },
  emptyCreateColonyLink: {
    id: 'pages.Dashboard.Colonies.emptyCreateColonyLink',
    defaultMessage: 'Get Started',
  },
  emptyAddColony: {
    id: 'pages.Dashboard.Colonies.emptyAddColony',
    defaultMessage: 'Add Colony',
  },
  emptyAddColonyDescription: {
    id: 'pages.Dashboard.Colonies.emptyAddColonyDescription',
    defaultMessage: `If you created a colony or you have the address of a colony
    that you would like to follow, add the colony address to your personalized
    list of colonies.`,
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

const Colonies = ({ network, networkClient, setUser, user }: Props) => {
  const [addColony, setAddColony] = useState(false);
  const supportedNetwork =
    network && (network.slug === 'mainnet' || network.slug === 'goerli');
  return (
    <>
      {supportedNetwork ? (
        <>
          {user.colonies &&
          user.colonies[network.slug] &&
          user.colonies[network.slug].length ? (
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
                      text="Cancel"
                      type="submit"
                    />
                  ) : (
                    <Button
                      appearance={{
                        theme: 'reset',
                        color: 'blue',
                      }}
                      onClick={() => setAddColony(true)}
                      text="+ Add Colony"
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
                    />
                  ))}
              </div>
            </div>
          ) : (
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
                        emptyCreateColonyLink: (
                          <Link
                            href="/colonyjs/intro-get-started"
                            text={MSG.emptyCreateColonyLink}
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
          )}
        </>
      ) : (
        <div className={styles.main}>
          <h1 className={styles.title}>
            <FormattedMessage {...MSG.unsupportedNetworkTitle} />
          </h1>
          <p className={styles.subTitle}>
            <FormattedMessage {...MSG.unsupportedNetworkMessage} />
          </p>
          <div className={styles.content} />
        </div>
      )}
    </>
  );
};

Colonies.displayName = displayName;

export default Colonies;
