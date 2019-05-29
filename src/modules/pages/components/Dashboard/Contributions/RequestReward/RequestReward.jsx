/* @flow */

import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

import Button from '~core/Button';
import Input from '~core/Input';

import styles from './RequestReward.module.css';

const MSG = defineMessages({
  labelAddress: {
    id: 'pages.Dashboard.Colonies.RequestReward.labelAddress',
    defaultMessage: 'Pull Request URL',
  },
  submitAddress: {
    id: 'pages.Dashboard.Colonies.RequestReward.submitAddress',
    defaultMessage: 'Request Reward',
  },
});

type Props = {|
  setRequestReward: (visible: boolean) => void,
|};

const displayName = 'pages.Dashboard.Colonies.RequestReward';

const RequestReward = ({ setRequestReward }: Props) => {
  const [url, setUrl] = useState('');

  const handleChangeUrl = event => {
    setUrl(event.currentTarget.value);
  };

  const handleRequestReward = async () => {
    // eslint-disable-next-line no-console
    console.log('Request Reward:', url);
    setRequestReward(false);
  };

  return (
    <div className={styles.field}>
      <Input
        appearance={{
          padding: 'huge',
          width: 'stretch',
        }}
        id="url"
        label={MSG.labelAddress}
        onChange={handleChangeUrl}
        type="text"
        value={url}
      />
      <Button
        appearance={{
          padding: 'large',
          theme: 'primary',
        }}
        onClick={handleRequestReward}
        text={MSG.submitAddress}
        type="submit"
      />
    </div>
  );
};

RequestReward.displayName = displayName;

export default RequestReward;
