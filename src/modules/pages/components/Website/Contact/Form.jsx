/* @flow */

import React, { useCallback } from 'react';
import { defineMessages } from 'react-intl';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';

import Button from '~core/Button';
import Input from '~core/Input';
import Paragraph from '~core/Paragraph';
import Textarea from '~core/Textarea';
import { useDiscordWebhook } from '~hooks';

import styles from './Form.module.css';

const MSG = defineMessages({
  buttonSubmit: {
    id: 'pages.Website.Contact.Form.buttonSubmit',
    defaultMessage: 'Submit',
  },
  labelUseCase: {
    id: 'pages.Website.Contact.Form.labelUseCase',
    defaultMessage: 'How do you plan to use Colony?',
  },
  placeholderProject: {
    id: 'pages.Website.Contact.Form.placeholderProject',
    defaultMessage: 'Company/Project name',
  },
  placeholderProjectSize: {
    id: 'pages.Website.Contact.Form.placeholderProjectSize',
    defaultMessage: 'Company/Project size',
  },
  placeholderEmail: {
    id: 'pages.Website.Contact.Form.placeholderEmail',
    defaultMessage: 'Email',
  },
  placeholderFirstName: {
    id: 'pages.Website.Contact.Form.placeholderFirstName',
    defaultMessage: 'First name',
  },
  placeholderLastName: {
    id: 'pages.Website.Contact.Form.placeholderLastName',
    defaultMessage: 'Last name',
  },
  placeholderWebsite: {
    id: 'pages.Website.Contact.Form.placeholderWebsite',
    defaultMessage: 'Website URL',
  },
  textError: {
    id: 'pages.Website.Contact.Form.textError',
    defaultMessage: 'There was an error signing up.',
  },
  textSuccess: {
    id: 'pages.Website.Contact.Form.textSuccess',
    defaultMessage: 'Thanks for signing up!',
  },
  validationTextEmail: {
    id: 'pages.Website.Contact.Form.validationTextEmail',
    defaultMessage: 'Please enter a valid email address',
  },
  validationTextRequired: {
    id: 'pages.Website.Contact.Form.validationTextRequired',
    defaultMessage: 'This field is required',
  },
  validationTextUrl: {
    id: 'pages.Website.Contact.Form.validationTextUrl',
    defaultMessage: 'Please enter a valid URL',
  },
});

type Props = {|
  initialValues: { email: string },
|};

const validationSchema = yup.object().shape({
  project: yup.string().required(MSG.validationTextRequired),
  projectSize: yup.string().required(MSG.validationTextRequired),
  email: yup
    .string()
    .email(MSG.validationTextEmail)
    .required(MSG.validationTextRequired),
  firstName: yup.string().required(MSG.validationTextRequired),
  lastName: yup.string().required(MSG.validationTextRequired),
  useCase: yup.string().required(MSG.validationTextRequired),
  website: yup.string().url(MSG.validationTextUrl),
});

const displayName = 'pages.Website.Contact.Form';

const Form = ({ initialValues }: Props) => {
  const { error, response, submitForm } = useDiscordWebhook({
    webhookId: process.env.DISCORD_WEBHOOK_ID_CONTACT_FORM || '',
    webhookToken: process.env.DISCORD_WEBHOOK_TOKEN_CONTACT_FORM || '',
  });

  const handleSubmit = useCallback(
    (values, { resetForm }) => {
      submitForm(values, resetForm);
    },
    [submitForm],
  );

  return (
    <Formik
      initialValues={{
        project: '',
        projectSize: '',
        email: '',
        firstName: '',
        lastName: '',
        useCase: '',
        website: '',
        ...initialValues,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      render={({
        errors,
        handleBlur,
        handleChange,
        isValid,
        touched,
        values: {
          project,
          projectSize,
          email,
          firstName,
          lastName,
          useCase,
          website,
        },
      }) => {
        const inputProps = {
          appearance: { size: 'stretch', theme: 'minimal' },
          onBlur: handleBlur,
          onChange: handleChange,
          showErrorText: true,
        };
        return (
          <FormikForm>
            <Input
              {...inputProps}
              error={errors.email && touched.email ? errors.email : undefined}
              id={`${displayName}.email`}
              name="email"
              placeholder={MSG.placeholderEmail}
              value={email}
            />
            <div className={styles.inline}>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : undefined
                  }
                  id={`${displayName}.firstName`}
                  name="firstName"
                  placeholder={MSG.placeholderFirstName}
                  value={firstName}
                />
              </div>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.lastName && touched.lastName
                      ? errors.lastName
                      : undefined
                  }
                  id={`${displayName}.lastName`}
                  name="lastName"
                  placeholder={MSG.placeholderLastName}
                  value={lastName}
                />
              </div>
            </div>
            <Input
              {...inputProps}
              error={
                errors.website && touched.website ? errors.website : undefined
              }
              id={`${displayName}.website`}
              name="website"
              placeholder={MSG.placeholderWebsite}
              value={website}
            />
            <div className={styles.inline}>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.project && touched.project
                      ? errors.project
                      : undefined
                  }
                  id={`${displayName}.project`}
                  name="project"
                  placeholder={MSG.placeholderProject}
                  value={project}
                />
              </div>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.projectSize && touched.projectSize
                      ? errors.projectSize
                      : undefined
                  }
                  id={`${displayName}.projectSize`}
                  name="projectSize"
                  placeholder={MSG.placeholderProjectSize}
                  value={projectSize}
                />
              </div>
            </div>
            <Textarea
              error={
                errors.useCase && touched.useCase ? errors.useCase : undefined
              }
              id={`${displayName}.useCase`}
              name="useCase"
              label={MSG.labelUseCase}
              onBlur={handleBlur}
              onChange={handleChange}
              showErrorText
              value={useCase}
            />
            <div className={styles.actionContainer}>
              <Button
                appearance={{
                  borderRadius: 'none',
                  padding: 'huge',
                  theme: 'primary',
                }}
                disabled={!isValid}
                text={MSG.buttonSubmit}
                type="submit"
              />
              {!!response && (
                <Paragraph
                  appearance={{ theme: 'lightBlue' }}
                  text={MSG.textSuccess}
                />
              )}
              {!!error && (
                <Paragraph
                  appearance={{ theme: 'danger' }}
                  text={MSG.textError}
                />
              )}
            </div>
          </FormikForm>
        );
      }}
    />
  );
};

Form.displayName = displayName;

export default Form;
