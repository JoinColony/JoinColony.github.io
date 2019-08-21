/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages } from 'react-intl';
import { withPrefix } from 'gatsby';

import Button from '~core/Button';
import Input from '~core/Input';
import Icon from '~core/Icon';
import Image from '~core/Image';
import Link from '~core/Link';
import MetaNav from '~parts/MetaNav';
import SocialNav from '~parts/SocialNav';
import { PAGE_INDEX } from '~routes';

import Menus from './Menus';

import styles from './Footer.module.css';

const MSG = defineMessages({
  placeholder: {
    id: 'layouts.WebsiteLayout.Footer.placeholder',
    defaultMessage: 'Subscribe to our newsletter',
  },
  submit: {
    id: 'layouts.WebsiteLayout.Footer.submit',
    defaultMessage: 'Submit',
  },
});

const displayName = 'layouts.WebsiteLayout.Footer';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleChange = useCallback(
    (event: SyntheticInputEvent<HTMLInputElement>) =>
      setEmail(event.currentTarget.value),
    [],
  );

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formEndpoint =
        // eslint-disable-next-line max-len
        '//colony.us9.list-manage.com/subscribe/post?u=f4d1f0850fe4aaa32124d89ca&id=fef68720b5';
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append('subscribe', email);
      // eslint-disable-next-line no-undef
      fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'content-type': 'multipart/form-data' },
      })
        .then()
        .then(() => {
          setEmail('');
        });
    },
    [email],
  );

  return (
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
              <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                  className={styles.input}
                  id={`${displayName}email`}
                  onChange={handleChange}
                  placeholder={MSG.placeholder}
                  type="email"
                  value={email}
                />
                <Button
                  appearance={{ theme: 'reset' }}
                  className={styles.button}
                  type="submit"
                >
                  <Image alt={MSG.submit} src={withPrefix('/img/submit.png')} />
                </Button>
              </form>
            </div>
            <div className={styles.menu}>
              <Menus />
            </div>
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
};

Footer.displayName = displayName;

export default Footer;
