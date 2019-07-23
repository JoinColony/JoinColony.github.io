/* @flow */

import { useEffect } from 'react';
import { navigate } from 'gatsby';

import { PAGE_DEV_DOCS } from '~routes';

/*
 * This page exists simply to force this bare endpoint to redirect to its immediate parent.
 */
const BareDocsEndpoint = () => {
  useEffect(() => {
    navigate(PAGE_DEV_DOCS);
  }, []);
  return null;
};

export default BareDocsEndpoint;
