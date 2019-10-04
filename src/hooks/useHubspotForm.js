/* @flow */

import { useCallback, useState } from 'react';

type FormConfig = {|
  formGuid: string,
  pageName: string,
  pageUri: string,
  portalId: string,
|};

type FormData = {
  /*
   * Hubspot's field name (same as the `input` `name` attribute on Hubspot Forms)
   *
   * e.g. { 'company_name': 'ABC', 'company_size': '6' }
   */
  [fieldName: string]: string,
};

type HubspotFieldsData = Array<{|
  name: string,
  value: string,
|}>;

type Status = {| error: string |} | {| response: Object |} | void;

type OnError = () => void;
type OnSuccess = () => void;

type HookReturn = {|
  error: ?string,
  response: ?Object,
  submitForm: (
    formData: FormData,
    onSuccess?: OnSuccess,
    onError?: OnError,
  ) => void,
|};

const useHubspotForm = ({
  formGuid,
  pageName,
  pageUri,
  portalId,
}: FormConfig): HookReturn => {
  // eslint-disable-next-line max-len
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const [status, setStatus] = useState<Status>();

  const prepareFieldsData = useCallback(
    (formData: FormData): HubspotFieldsData =>
      Object.keys(formData).map(fieldName => ({
        name: fieldName,
        value: formData[fieldName],
      })),
    [],
  );

  const submitForm = useCallback(
    (formData: FormData, onSuccess?: OnSuccess, onError?: OnError) => {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          context: {
            pageUri,
            pageName,
          },
          fields: prepareFieldsData(formData),
        }),
      };

      // eslint-disable-next-line no-undef
      fetch(endpoint, fetchOptions)
        .then(res => res.json())
        .then(res => {
          setStatus({ response: res });
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch(err => {
          setStatus({ error: err.message });
          if (onError) {
            onError();
          }
        });
    },
    [endpoint, pageName, pageUri, prepareFieldsData],
  );

  return {
    error: (status && status.error) || undefined,
    response: (status && status.response) || undefined,
    submitForm,
  };
};

export default useHubspotForm;
