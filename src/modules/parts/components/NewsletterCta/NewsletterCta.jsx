/* @flow */

import React, { useCallback } from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import InputGroup from '~core/InputGroup';

import styles from './NewsletterCta.module.css';

const MSG = defineMessages({
  title: {
    id: 'parts.NewsletterCta.title',
    defaultMessage: 'Our newsletter is infrequent and awesome.',
  },
  placeholder: {
    id: 'parts.NewsletterCta.placeholder',
    defaultMessage: 'Your email, please.',
  },
  buttonText: {
    id: 'parts.NewsletterCta.buttonText',
    defaultMessage: 'Prove it',
  },
});

type Props = {|
  id: string,
|};

const displayName = 'parts.NewsletterCta';

const NewsletterCta = ({ id }: Props) => {
  const handleSubmit = useCallback((value: string) => {
    const formEndpoint =
      // eslint-disable-next-line max-len
      '//colony.us9.list-manage.com/subscribe/post?u=f4d1f0850fe4aaa32124d89ca&id=fef68720b5';
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('subscribe', value);
    // eslint-disable-next-line no-undef
    fetch(formEndpoint, {
      method: 'POST',
      body: formData,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <Heading
          appearance={{
            margin: 'none',
            size: 'large',
            theme: 'primary',
            weight: 'medium',
          }}
          text={MSG.title}
        />
      </div>
      <div className={styles.form}>
        <InputGroup
          appearance={{ stack: 'mediumDown', theme: 'light' }}
          buttonText={MSG.buttonText}
          id={id}
          onSubmit={handleSubmit}
          placeholder={MSG.placeholder}
          type="email"
        />
      </div>
    </div>
  );
};

NewsletterCta.displayName = displayName;

export default NewsletterCta;
