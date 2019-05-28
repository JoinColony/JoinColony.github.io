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
    defaultMessage: 'My Colonies',
  },
  onboardingTitle: {
    id: 'pages.Dashboard.Colonies.onboardingTitle',
    defaultMessage: `You don't have any colonies yet!`,
  },
  onboardingDescription: {
    id: 'pages.Dashboard.Colonies.onboardingDescription',
    defaultMessage: `Keep track of your colonies. Follow the steps below to add
    your first colony.`,
  },
  onboardingStep1: {
    id: 'pages.Dashboard.Colonies.onboardingStep1',
    defaultMessage: 'Step 1: Get Started',
  },
  onboardingStep1Description: {
    id: 'pages.Dashboard.Colonies.onboardingStep1Description',
    defaultMessage: 'Create your first colony in {onboardingStep1Link}.',
  },
  onboardingStep1Link: {
    id: 'pages.Dashboard.Colonies.onboardingStep1Link',
    defaultMessage: 'Get Started',
  },
  onboardingStep2: {
    id: 'pages.Dashboard.Colonies.onboardingStep2',
    defaultMessage: 'Step 2: Add Colony',
  },
  onboardingStep2Description: {
    id: 'pages.Dashboard.Colonies.onboardingStep2Description',
    defaultMessage: `Add your first colony to your list of colonies.`,
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
  const [visible, setVisible] = useState(false);
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
              <div className={styles.content}>
                <div className={styles.coloniesWrapper}>
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
                {visible ? (
                  <AddColony
                    network={network}
                    networkClient={networkClient}
                    setUser={setUser}
                    setVisible={setVisible}
                    user={user}
                  />
                ) : (
                  <Button
                    appearance={{
                      theme: 'reset',
                      color: 'blue',
                    }}
                    onClick={() => setVisible(!visible)}
                    text="+ Add Colony"
                    type="submit"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className={styles.main}>
              <h1 className={styles.title}>
                <FormattedMessage {...MSG.onboardingTitle} />
              </h1>
              <p className={styles.subTitle}>
                <FormattedMessage {...MSG.onboardingDescription} />
              </p>
              <div className={styles.content}>
                <div className={styles.contentItem}>
                  <h4 className={styles.onboardingStepTitle}>
                    <FormattedMessage {...MSG.onboardingStep1} />
                  </h4>
                  <p>
                    <FormattedMessage
                      values={{
                        onboardingStep1Link: (
                          <Link
                            href="/colonyjs/intro-get-started"
                            text={MSG.onboardingStep1Link}
                          />
                        ),
                      }}
                      {...MSG.onboardingStep1Description}
                    />
                  </p>
                </div>
                <div className={styles.contentItem}>
                  <h4 className={styles.onboardingStepTitle}>
                    <FormattedMessage {...MSG.onboardingStep2} />
                  </h4>
                  <p>
                    <FormattedMessage {...MSG.onboardingStep2Description} />
                  </p>
                </div>
                <AddColony
                  network={network}
                  networkClient={networkClient}
                  setUser={setUser}
                  setVisible={setVisible}
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
