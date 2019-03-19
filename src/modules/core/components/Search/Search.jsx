/* @flow */
import type { IntlShape } from 'react-intl';

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import docsearch from 'docsearch.js';
import nanoid from 'nanoid';

import 'docsearch.js/dist/cdn/docsearch.min.css';

import Icon from '~core/Icon';
import { getMainClasses } from '~utils/css';

import {
  docSearchApiKey,
  docSearcIndexName,
} from '../../../../docsearch-settings';

import styles from './Search.module.css';
import './algolia-overrides.css';

const MSG = defineMessages({
  placeholderText: {
    id: 'parts.Search.placeholderText',
    defaultMessage: 'Search Docs',
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
|};

type State = {|
  inputId: string,
  isEnabled: boolean,
|};

class Search extends Component<Props, State> {
  static displayName = 'Search';

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

  render() {
    const {
      appearance,
      intl: { formatMessage },
    } = this.props;
    const { inputId, isEnabled } = this.state;
    const placeholderText = formatMessage(MSG.placeholderText);
    const isQuickSearch = appearance && appearance.type === 'quickSearch';
    return isEnabled ? (
      <div className={getMainClasses(appearance, styles)}>
        <input
          className={styles.searchInput}
          id={inputId}
          type="text"
          placeholder={placeholderText}
          title={placeholderText}
        />
        {isQuickSearch && (
          <Icon
            className={styles.quickSearchIcon}
            name="search"
            title="search"
            viewBox="0 0 25 25"
          />
        )}
      </div>
    ) : null;
  }
}

export default injectIntl(Search);
