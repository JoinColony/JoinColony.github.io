/* @flow */
import type { IntlShape, MessageDescriptor } from 'react-intl';

import React, { Component, createRef } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import docsearch from 'docsearch.js';
import nanoid from 'nanoid';

import 'docsearch.js/dist/cdn/docsearch.min.css';

import Button from '~core/Button';
import Icon from '~core/Icon';
import { getMainClasses } from '~utils/css';

import {
  docSearchApiKey,
  docSearcIndexName,
} from '../../../../docsearch-settings';

import styles from './Search.module.css';
import './algolia-overrides.css';

const MSG = defineMessages({
  defaultPlaceholderText: {
    id: 'Search.defaultPlaceholderText',
    defaultMessage: 'Search',
  },
});

type Appearance = {|
  theme?: 'light',
  type?: 'quickSearch',
|};

type Props = {|
  appearance?: Appearance,
  /** Injected by `injectIntl` */
  intl: IntlShape,
  placeholderText?: MessageDescriptor | string,
  placeholderTextValues?: Object,
|};

type State = {|
  inputId: string,
  isEnabled: boolean,
|};

class Search extends Component<Props, State> {
  inputRef: { current: null | HTMLInputElement };

  static displayName = 'Search';

  constructor(props) {
    super(props);

    this.inputRef = createRef();
  }

  state = {
    inputId: `searchInput${nanoid()}`,
    isEnabled: true,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      const { inputId } = this.state;
      docsearch({
        apiKey: docSearchApiKey,
        indexName: docSearcIndexName,
        inputSelector: `#${inputId}`,
      });
    } else {
      this.setState({ isEnabled: false });
    }
  }

  focusInput = () => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  render() {
    const {
      appearance,
      intl: { formatMessage },
      placeholderText = MSG.defaultPlaceholderText,
      placeholderTextValues,
    } = this.props;
    const { inputId, isEnabled } = this.state;
    const placeholderTextContent =
      typeof placeholderText === 'string'
        ? placeholderText
        : formatMessage(placeholderText, placeholderTextValues);
    const isQuickSearch = appearance && appearance.type === 'quickSearch';
    return isEnabled ? (
      <div className={getMainClasses(appearance, styles)}>
        <input
          className={styles.searchInput}
          id={inputId}
          placeholder={placeholderTextContent}
          ref={this.inputRef}
          title={placeholderTextContent}
          type="text"
        />
        {isQuickSearch && (
          <Button
            appearance={{ theme: 'reset' }}
            onClick={this.focusInput}
            /*
             * Because the adjacent `input` is naturally focusable,
             * let's disable tabstop on this button.
             */
            tabIndex="-1"
          >
            <Icon
              className={styles.quickSearchIcon}
              name="search"
              title={placeholderTextContent}
              viewBox="0 0 25 25"
            />
          </Button>
        )}
      </div>
    ) : null;
  }
}

export default injectIntl(Search);
