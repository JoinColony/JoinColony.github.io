/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import GutterSection from '~parts/GutterSection';
import { COLONY_DISCOURSE, COLONY_GITHUB_BUDGETBOX } from '~routes';

import styles from './Modules.module.css';

const MSG = defineMessages({
  body: {
    id: 'pages.Website.AboutColonyNetwork.Modules.body',
    defaultMessage: `Modules extend the Colony Network’s
      functionality with new stuff for different contexts,
      like smart contracts to do different kinds of voting,
      or what the appeal and escalation rules in disputes
      are, or special payment types.`,
  },
  bodyBudgetBox: {
    id: 'pages.Website.AboutColonyNetwork.Modules.bodyBudgetBox',
    defaultMessage: `A meritocratic capital allocation mechanism
      for distributing ongoing funding between competing recipients.`,
  },
  bodyFunding: {
    id: 'pages.Website.AboutColonyNetwork.Modules.bodyFunding',
    defaultMessage: `Most decisions should not need voting: as
      long as nobody objects, proposals get funded in order of support.`,
  },
  bodyReputation: {
    id: 'pages.Website.AboutColonyNetwork.Modules.bodyReputation',
    defaultMessage: `Leveraging Colony’s Reputation system,
      votes are weighted according to the demonstrated expertise
      of the individual.`,
  },
  bodyToken: {
    id: 'pages.Website.AboutColonyNetwork.Modules.bodyToken',
    defaultMessage: `Colony’s Partial Lock Commit/Reveal token
      voting mechanism keeps votes secret and avoids bias.`,
  },
  hoverBodyBudgetBox: {
    id: 'pages.Website.AboutColonyNetwork.Modules.hoverBodyBudgetBox',
    defaultMessage: 'Learn more about BudgetBox',
  },
  title: {
    id: 'pages.Website.AboutColonyNetwork.Modules.title',
    defaultMessage: 'Modules',
  },
  linkGutter: {
    id: 'pages.Website.AboutColonyNetwork.Modules.linkGutter',
    defaultMessage: 'Tell us what you want',
  },
  titleFunding: {
    id: 'pages.Website.AboutColonyNetwork.Modules.titleFunding',
    defaultMessage: 'Funding{br}queues*',
  },
  titleReputation: {
    id: 'pages.Website.AboutColonyNetwork.Modules.titleReputation',
    defaultMessage: 'Reputation{br}weighted voting*',
  },
  titleToken: {
    id: 'pages.Website.AboutColonyNetwork.Modules.titleToken',
    defaultMessage: 'Token weighted{br}voting*',
  },
});

const SubItem = ({
  title,
  body,
}: {
  title: MessageDescriptor,
  body: MessageDescriptor,
}) => (
  <div className={styles.subItem}>
    <Heading
      appearance={{ size: 'mediumLarge', theme: 'dark', weight: 'medium' }}
    >
      <FormattedMessage {...title} values={{ br: <br /> }} />
    </Heading>
    <p>
      <FormattedMessage {...body} />
    </p>
  </div>
);

const displayName = 'pages.Website.AboutColonyNetwork.Modules';

const Modules = () => (
  <GutterSection linkLeft={{ href: COLONY_DISCOURSE, text: MSG.linkGutter }}>
    <div className={styles.mainContentRow}>
      <div className={styles.titleContent}>
        <Heading
          appearance={{ margin: 'none', theme: 'invert', weight: 'bold' }}
          text={MSG.title}
        />
        <div className={styles.titleBody}>
          <p>
            <FormattedMessage {...MSG.body} />
          </p>
        </div>
      </div>
      <div className={styles.featureContent}>
        <Heading
          appearance={{
            margin: 'none',
            size: 'medium',
            theme: 'invert',
            weight: 'medium',
          }}
          text="BudgetBox*"
        />
        <div className={styles.featureBody}>
          <p>
            <FormattedMessage {...MSG.bodyBudgetBox} />
          </p>
        </div>
        <Link
          className={styles.featureContentHover}
          href={COLONY_GITHUB_BUDGETBOX}
        >
          <Icon
            className={styles.budgetBoxLogo}
            name="logomark_budgetbox"
            title="BudgetBox"
            viewBox="0 0 82 82"
          />
          <Heading
            appearance={{
              theme: 'invert',
              size: 'mediumLarge',
              weight: 'thin',
            }}
            text={MSG.hoverBodyBudgetBox}
          />
        </Link>
      </div>
    </div>
    <div className={styles.subContentRow}>
      <SubItem title={MSG.titleReputation} body={MSG.bodyReputation} />
      <SubItem title={MSG.titleToken} body={MSG.bodyToken} />
      <SubItem title={MSG.titleFunding} body={MSG.bodyFunding} />
    </div>
  </GutterSection>
);

Modules.displayName = displayName;

export default Modules;
