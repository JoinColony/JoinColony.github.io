/* @flow */

import React from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import Link from '~core/Link';
import MetaNav from '~parts/MetaNav';
import SocialNav from '~parts/SocialNav';
import { PAGE_INDEX } from '~routes';

import Menus from './Menus';

import styles from './Footer.module.css';

const MSG = defineMessages({
  textSubscribe: {
    id: 'layouts.WebsiteLayout.Footer.textSubscribe',
    defaultMessage: 'Subscribe to our newsletter',
  },
});

const displayName = 'layouts.WebsiteLayout.Footer';

const Footer = () => (
  <>
    <div className={styles.divider} />
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.contentContainer}>
          <div>
            <div className={styles.logoContainer}>
              <Link href={PAGE_INDEX}>
                <Icon
                  className={styles.logo}
                  name="colony_logomark"
                  title="Colony"
                />
              </Link>
            </div>
            <Heading
              appearance={{
                size: 'mediumLarge',
                theme: 'grey',
                weight: 'thin',
              }}
              text={MSG.textSubscribe}
            />
            {/* @TODO: input here, make heading above a label */}
          </div>
          <Menus />
        </div>
        <div className={styles.metaRow}>
          <div className={styles.metaNavContainer}>
            <MetaNav />
          </div>
          <div className={styles.socialNavContainer}>
            <SocialNav appearance={{ theme: 'light' }} />
          </div>
        </div>
      </div>
    </div>
  </>
);

Footer.displayName = displayName;

export default Footer;
