/* @flow */

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withPrefix } from 'gatsby';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import { PAGE_ABOUT_COLONY_NETWORK } from '~routes';

import styles from './TokenSupport.module.css';

const MSG = defineMessages({
  bullet0: {
    id: 'parts.ProductPlatform.TokenSupport.bullet0',
    defaultMessage: 'Easily issue your own token',
  },
  bullet1: {
    id: 'parts.ProductPlatform.TokenSupport.bullet1',
    defaultMessage: 'Supports all existing ERC20 tokens',
  },
  bullet2: {
    id: 'parts.ProductPlatform.TokenSupport.bullet2',
    defaultMessage: 'Pay people in USD using DAI',
  },
  linkLearnMore: {
    id: 'parts.ProductPlatform.TokenSupport.linkLearnMore',
    defaultMessage: 'Learn more',
  },
  title: {
    id: 'parts.ProductPlatform.TokenSupport.title',
    defaultMessage: 'Token Support',
  },
});

const displayName = 'parts.ProductPlatform.TokenSupport';

const TokenSupport = () => (
  <div className={styles.main}>
    <div className={styles.innerContainer}>
      <div className={styles.imageContainer}>
        <Image
          alt={MSG.title}
          className={styles.image}
          src={withPrefix('/img/tokens_3x3.png')}
        />
      </div>
      <div className={styles.contentContainer}>
        <div>
          <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        </div>
        <ul className={styles.bullets}>
          {Array(3)
            .fill(null)
            .map((_, idx) => {
              const bulletText = MSG[`bullet${idx}`];
              return (
                // `disable` below b/c these will never be reordered, thus React will survive.
                // eslint-disable-next-line react/no-array-index-key
                <li className={styles.listItem} key={idx}>
                  <Image
                    alt={bulletText}
                    className={styles.listItemImage}
                    src={withPrefix('/img/checkcircle.svg')}
                  />
                  <FormattedMessage {...bulletText} />
                </li>
              );
            })}
        </ul>
        <Link
          className={styles.link}
          href={PAGE_ABOUT_COLONY_NETWORK}
          text={MSG.linkLearnMore}
        />
      </div>
    </div>
  </div>
);

TokenSupport.displayName = displayName;

export default TokenSupport;
