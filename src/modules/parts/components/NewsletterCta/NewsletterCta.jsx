/* @flow */

import React, { useCallback } from 'react';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import InputGroup from '~core/InputGroup';
import { useHubspotForm } from '~hooks';

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
  // Used for form analytics
  pageName: string,
  // Used for form analytics
  pageUri: string,
|};

const displayName = 'parts.NewsletterCta';

const NewsletterCta = ({ id, pageName, pageUri }: Props) => {
  const { submitForm } = useHubspotForm({
    formGuid: 'd0e98a7b-aba5-412b-8c12-ace04835bad9',
    pageName,
    pageUri,
    portalId: '4846129',
  });

  const handleSubmit = useCallback(
    (value: string) => {
      const formData = { email: value };
      submitForm(formData);
    },
    [submitForm],
  );

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
