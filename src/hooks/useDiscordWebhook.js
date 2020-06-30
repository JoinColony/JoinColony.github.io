/* @flow */

import { useCallback, useState } from 'react';
// $FlowFixMe (definitions not updated for 1.3.x)
import { useLocation } from '@reach/router';

type WebhookConfig = {|
  webhookId: string,
  webhookToken: string,
|};

type Status = {| error: string |} | {| response: Object |} | void;

type OnError = () => void;
type OnSuccess = () => void;

type HookReturn = {|
  error: ?string,
  response: ?Object,
  submitForm: (
    formValues: Object,
    onSuccess?: OnSuccess,
    onError?: OnError,
  ) => Promise<void>,
|};

const useDiscordWebhook = ({
  webhookId,
  webhookToken,
}: WebhookConfig): HookReturn => {
  const { pathname } = useLocation();
  // @NOTE if this webhook starts getting spammed, we'll need to remove this feature
  // eslint-disable-next-line max-len
  const endpoint = `https://discordapp.com/api/webhooks/${webhookId}/${webhookToken}`;

  const [status, setStatus] = useState<Status>();

  const submitForm = useCallback(
    async (formValues: Object, onSuccess?: OnSuccess, onError?: OnError) => {
      // eslint-disable-next-line max-len
      let content = `New submission via the website from \`${pathname}\`:\n\n`;
      Object.keys(formValues).forEach(itemKey => {
        content += `${itemKey}: ${formValues[itemKey]}\n`;
      });
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;',
        },
        body: JSON.stringify({
          content,
        }),
      };

      try {
        // eslint-disable-next-line no-undef
        await fetch(endpoint, fetchOptions);
        setStatus({ response: 'Success!' });
        if (onSuccess) {
          onSuccess();
        }
      } catch (e) {
        setStatus({ error: e.message });
        if (onError) {
          onError();
        }
      }
    },
    [endpoint, pathname],
  );

  return {
    error: (status && status.error) || undefined,
    response: (status && status.response) || undefined,
    submitForm,
  };
};

export default useDiscordWebhook;
