import React, { Component } from 'react';

import 'docsearch.js/dist/cdn/docsearch.min.css';

import styles from './Search.module.css';
import './algolia-overrides.css';

import { docSearchApiKey, docSearcIndexName } from '../../docsearch-settings';

class Search extends Component {
  state = {
    isEnabled: true,
  };
  componentDidMount() {
    if (typeof window !== 'undefined') {
      const docsearch = require('docsearch.js/dist/npm');
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
    return this.state.isEnabled ? (
      <input className={styles.searchInput} type="text" placeholder="Search" />
    ) : null;
  }
}

export default Search;
