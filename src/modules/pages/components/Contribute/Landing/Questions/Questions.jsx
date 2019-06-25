/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import styles from './Questions.module.css';

import Button from '~core/Button';

const MSG = defineMessages({
  answer1: {
    id: 'pages.Contribute.Landing.Questions.answer1',
    defaultMessage: `CDEV is the native token of the Colony Developer Community.
    It is earned by successfully contributing to the community.`,
  },
  answer2: {
    id: 'pages.Contribute.Landing.Questions.answer2',
    defaultMessage: `HODL! As further Colony Network extensions such as funding
    queues, objections, and disputes roll out, you will need to stake CDEV to
    perform a variety of actions. Right now the economic proposition is a little
    up in the air. Drop by the CDEV thread in the forum to share your ideas.`,
  },
  answer3: {
    id: 'pages.Contribute.Landing.Questions.answer3',
    defaultMessage: `CDEV is currently locked and not transferable between
    accounts. This may change in due course as the experiment progresses.`,
  },
  answer4: {
    id: 'pages.Contribute.Landing.Questions.answer4',
    defaultMessage: `Reputation is a measure of your standing and influence in
    the community. The more you have, the higher your standing.`,
  },
  answer5: {
    id: 'pages.Contribute.Landing.Questions.answer5',
    defaultMessage: `The amount of reputation earned for each contribution is
    equal to the amount of CDEV earned. However, reputation decays over time
    with a halflife of about 3.5 months.`,
  },
  answer6: {
    id: 'pages.Contribute.Landing.Questions.answer6',
    defaultMessage: `Right now it represents the standing your efforts have
    earned you in the community.  In the future, reputation will weight your
    influence within this community. You will use your reputation to vote on
    open decisions.`,
  },
  answer7: {
    id: 'pages.Contribute.Landing.Questions.answer7',
    defaultMessage: `No, reputation is non-transferable between accounts. This
    ensures influence can only be earned and not bought.`,
  },
  answer8: {
    id: 'pages.Contribute.Landing.Questions.answer8',
    defaultMessage: `Create an account and complete your first contribution.
    Once it is approved, you'll receive some CDEV and Reputation. Go to your
    Account Page to see your current balance.`,
  },
  question1: {
    id: 'pages.Contribute.Landing.Questions.question1',
    defaultMessage: 'What is the CDEV Token?',
  },
  question2: {
    id: 'pages.Contribute.Landing.Questions.question2',
    defaultMessage: 'What can I do with CDEV?',
  },
  question3: {
    id: 'pages.Contribute.Landing.Questions.question3',
    defaultMessage: 'Can I transfer CDEV to another wallet or user?',
  },
  question4: {
    id: 'pages.Contribute.Landing.Questions.question4',
    defaultMessage: 'What is reputation?',
  },
  question5: {
    id: 'pages.Contribute.Landing.Questions.question5',
    defaultMessage: 'How is reputation calculated?',
  },
  question6: {
    id: 'pages.Contribute.Landing.Questions.question6',
    defaultMessage: 'What can I do with reputation?',
  },
  question7: {
    id: 'pages.Contribute.Landing.Questions.question7',
    defaultMessage: 'Can I transfer my reputation to another account?',
  },
  question8: {
    id: 'pages.Contribute.Landing.Questions.question8',
    defaultMessage: 'How do I get started?',
  },
});

const displayName = 'pages.Contribute.Landing.Questions';

const Questions = () => {
  const [selected, setSelected] = useState([]);
  const items = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const handleClick = useCallback(
    event => {
      if (selected.includes(event.currentTarget.id)) {
        const result = selected.filter(item => item !== event.currentTarget.id);
        setSelected(result);
      } else {
        const result = [...selected, event.currentTarget.id];
        setSelected(result);
      }
    },
    [selected],
  );
  return (
    <div className={styles.main}>
      {items.map(item => (
        <Button
          id={item}
          key={item}
          appearance={{ theme: 'reset' }}
          onClick={handleClick}
        >
          <div className={styles.question}>
            <div
              className={
                selected.includes(item)
                  ? styles.triangleDown
                  : styles.triangleRight
              }
            />
            <FormattedMessage {...MSG[`question${item}`]} />
          </div>
          {selected.includes(item) && (
            <div className={styles.answer}>
              <FormattedMessage {...MSG[`answer${item}`]} />
            </div>
          )}
        </Button>
      ))}
    </div>
  );
};

Questions.displayName = displayName;

export default Questions;
