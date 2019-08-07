/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';

import Badge from '~core/Badge';
import Paragraph from '~core/Paragraph';

import styles from './BadgeGroup.module.css';

type Props = {|
  badgeColor?: 'primary' | 'secondary',
  labelText: MessageDescriptor,
  messageGroups: Array<{ [key: string]: MessageDescriptor }>,
|};

const displayName = 'BadgeGroup';

const BadgeGroup = ({
  badgeColor = 'primary',
  labelText,
  messageGroups,
}: Props) => (
  <div className={styles.badgesGroup}>
    <div className={styles.badgesGroupInner}>
      {messageGroups.map((messages, idx) => (
        // `disable` below b/c these will never be reordered, thus React will survive.
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.badgesCol} key={idx}>
          {Object.keys(messages).map(msgKey => (
            <div className={styles.badge} key={messages[msgKey].id}>
              <Badge
                appearance={{ theme: badgeColor }}
                text={messages[msgKey]}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
    <div className={styles.groupLabel}>
      <Paragraph
        appearance={{ size: 'normal', theme: 'grey' }}
        text={labelText}
      />
    </div>
  </div>
);

BadgeGroup.displayName = displayName;

export default BadgeGroup;
