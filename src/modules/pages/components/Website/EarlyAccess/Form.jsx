/* @flow */

import React, { useCallback, useState } from 'react';
import { defineMessages } from 'react-intl';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';

import Button from '~core/Button';
import Input from '~core/Input';
import Paragraph from '~core/Paragraph';
import Textarea from '~core/Textarea';
import { PAGE_GET_EARLY_ACCESS } from '~routes';

import styles from './Form.module.css';

const MSG = defineMessages({
  buttonSubmit: {
    id: 'pages.Website.EarlyAccess.Form.buttonSubmit',
    defaultMessage: 'Submit',
  },
  labelUseCase: {
    id: 'pages.Website.EarlyAccess.Form.labelUseCase',
    defaultMessage: 'How do you plan to use Colony?',
  },
  placeholderCompanyName: {
    id: 'pages.Website.EarlyAccess.Form.placeholderCompanyName',
    defaultMessage: 'Company/Project name',
  },
  placeholderCompanySize: {
    id: 'pages.Website.EarlyAccess.Form.placeholderCompanySize',
    defaultMessage: 'Company/Project size',
  },
  placeholderEmail: {
    id: 'pages.Website.EarlyAccess.Form.placeholderEmail',
    defaultMessage: 'Email',
  },
  placeholderNameFirst: {
    id: 'pages.Website.EarlyAccess.Form.placeholderNameFirst',
    defaultMessage: 'First name',
  },
  placeholderNameLast: {
    id: 'pages.Website.EarlyAccess.Form.placeholderNameLast',
    defaultMessage: 'Last name',
  },
  placeholderWebsiteUrl: {
    id: 'pages.Website.EarlyAccess.Form.placeholderWebsiteUrl',
    defaultMessage: 'Website URL',
  },
  textSuccess: {
    id: 'pages.Website.EarlyAccess.Form.textSuccess',
    defaultMessage: 'Thanks for signing up!',
  },
  validationTextEmail: {
    id: 'pages.Website.EarlyAccess.Form.validationTextEmail',
    defaultMessage: 'Please enter a valid email address',
  },
  validationTextRequired: {
    id: 'pages.Website.EarlyAccess.Form.validationTextRequired',
    defaultMessage: 'This field is required',
  },
  validationTextUrl: {
    id: 'pages.Website.EarlyAccess.Form.validationTextUrl',
    defaultMessage: 'Please enter a valid URL',
  },
});

type Props = {|
  initialValues: { email?: string },
|};

const validationSchema = yup.object().shape({
  companyName: yup.string().required(MSG.validationTextRequired),
  companySize: yup.string().required(MSG.validationTextRequired),
  email: yup
    .string()
    .email(MSG.validationTextEmail)
    .required(MSG.validationTextRequired),
  nameFirst: yup.string().required(MSG.validationTextRequired),
  nameLast: yup.string().required(MSG.validationTextRequired),
  useCase: yup.string().required(MSG.validationTextRequired),
  websiteUrl: yup.string().url(MSG.validationTextUrl),
});

const displayName = 'pages.Website.EarlyAccess.Form';

const Form = ({ initialValues }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const portalId = '4846129';
  const formGuid = '8e34f607-d535-42eb-8b34-38fb6b31ab49';
  // eslint-disable-next-line max-len
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const handleSubmit = useCallback(
    (
      {
        companyName,
        companySize,
        email,
        nameFirst,
        nameLast,
        useCase,
        websiteUrl,
      },
      { resetForm },
    ) => {
      const fields: Array<{ name: string, value: string }> = [
        { name: 'company', value: companyName },
        { name: 'company_size', value: companySize },
        { name: 'email', value: email },
        { name: 'how_do_you_plan_to_use_colony_', value: useCase },
        { name: 'firstname', value: nameFirst },
        { name: 'lastname', value: nameLast },
        { name: 'website', value: websiteUrl },
      ];
      // eslint-disable-next-line no-undef
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          context: {
            pageUri: `https://colony.io${PAGE_GET_EARLY_ACCESS}`,
            pageName: 'Get Early Access',
          },
          fields,
        }),
      })
        .then()
        .then(() => {
          setShowSuccess(true);
          resetForm();
        });
    },
    [endpoint],
  );

  return (
    <Formik
      initialValues={{
        companyName: '',
        companySize: '',
        email: '',
        nameFirst: '',
        nameLast: '',
        useCase: '',
        websiteUrl: '',
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
          companyName,
          companySize,
          email,
          nameFirst,
          nameLast,
          useCase,
          websiteUrl,
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
                    errors.nameFirst && touched.nameFirst
                      ? errors.nameFirst
                      : undefined
                  }
                  id={`${displayName}.nameFirst`}
                  name="nameFirst"
                  placeholder={MSG.placeholderNameFirst}
                  value={nameFirst}
                />
              </div>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.nameLast && touched.nameLast
                      ? errors.nameLast
                      : undefined
                  }
                  id={`${displayName}.nameLast`}
                  name="nameLast"
                  placeholder={MSG.placeholderNameLast}
                  value={nameLast}
                />
              </div>
            </div>
            <Input
              {...inputProps}
              error={
                errors.websiteUrl && touched.websiteUrl
                  ? errors.websiteUrl
                  : undefined
              }
              id={`${displayName}.websiteUrl`}
              name="websiteUrl"
              placeholder={MSG.placeholderWebsiteUrl}
              value={websiteUrl}
            />
            <div className={styles.inline}>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.companyName && touched.companyName
                      ? errors.companyName
                      : undefined
                  }
                  id={`${displayName}.companyName`}
                  name="companyName"
                  placeholder={MSG.placeholderCompanyName}
                  value={companyName}
                />
              </div>
              <div>
                <Input
                  {...inputProps}
                  error={
                    errors.companySize && touched.companySize
                      ? errors.companySize
                      : undefined
                  }
                  id={`${displayName}.companySize`}
                  name="companySize"
                  placeholder={MSG.placeholderCompanySize}
                  value={companySize}
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
              {showSuccess && (
                <Paragraph
                  appearance={{ theme: 'lightBlue' }}
                  text={MSG.textSuccess}
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
