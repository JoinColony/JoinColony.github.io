/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import { COLONY_DISCOURSE_SUPPORT } from '~routes';

import CtaItem from './CtaItem';

import styles from './DevRelCta.module.css';

const MSG = defineMessages({
  supportHeading: {
    id: 'parts.DevRelCta.supportHeading',
    defaultMessage: 'Support',
  },
  supportContent: {
    id: 'parts.DevRelCta.supportContent',
    defaultMessage:
      'Questions? Problems? Existential dilemmas? We’re here to help!',
  },
  supportLinkText: {
    id: 'parts.DevRelCta.supportLinkText',
    defaultMessage: 'Contact DevRel',
  },
  improveDocHeading: {
    id: 'parts.DevRelCta.improveDocHeading',
    defaultMessage: 'Improve this doc.',
  },
  improveDocContent: {
    id: 'parts.DevRelCta.improveDocContent',
    defaultMessage:
      // eslint-disable-next-line max-len
      'All improvements to documentation are welcome and encouraged. Submit a PR for documentation on GitHub.',
  },
  improveDocLinkText: {
    id: 'parts.DevRelCta.supportLinkText',
    defaultMessage: 'To the repo!',
  },
});

type Props = {|
  editUrl: string,
|};

const displayName = 'parts.DevRelCta';

const DevRelCta = ({ editUrl }: Props) => (
  <div className={styles.main}>
    <div className={styles.ctaItem}>
      <CtaItem
        contentText={MSG.supportContent}
        headingText={MSG.supportHeading}
        linkText={MSG.supportLinkText}
        linkUrl={COLONY_DISCOURSE_SUPPORT}
      />
    </div>
    <div className={styles.ctaItem}>
      <CtaItem
        contentText={MSG.improveDocContent}
        headingText={MSG.improveDocHeading}
        linkText={MSG.improveDocLinkText}
        linkUrl={editUrl}
      />
    </div>
  </div>
);

DevRelCta.displayName = displayName;

export default DevRelCta;
