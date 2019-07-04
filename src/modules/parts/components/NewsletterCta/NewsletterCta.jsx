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
    console.log(value);
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
          appearance={{ theme: 'light' }}
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
