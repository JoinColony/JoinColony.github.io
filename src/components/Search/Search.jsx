/* @flow */
import React, { Component } from 'react';

import docsearch from 'docsearch.js';

import 'docsearch.js/dist/cdn/docsearch.min.css';

import styles from './Search.module.css';
import './algolia-overrides.css';

import { docSearchApiKey, docSearcIndexName } from '../../docsearch-settings';

type State = {
  isEnabled: boolean,
};

class Search extends Component<{}, State> {
  state = {
    isEnabled: true,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      docsearch({
        apiKey: docSearchApiKey,
        indexName: docSearcIndexName,
        inputSelector: `.${styles.searchInput}`,
      });
    } else {
      this.setState({ isEnabled: false });
    }
  }

  render() {
    const { isEnabled } = this.state;
    return isEnabled ? (
      <input className={styles.searchInput} type="text" placeholder="Search" />
    ) : null;
  }
}

export default Search;
