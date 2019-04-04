/* @flow */
import type { HOC } from 'recompose';

import { injectIntl } from 'react-intl';
import { compose, defaultProps, withHandlers, withProps } from 'recompose';

import { withFileContext } from '~hoc/files';
import { withLocation } from '~hoc/location';

import type { InProps } from './types';

import SEO from './SEO.jsx';

const enhance: HOC<*, InProps> = compose(
  injectIntl,
  withFileContext(),
  withLocation(),
  defaultProps({
    isDocPage: false,
  }),
  withProps(() => ({
    baseUrl: 'https://docs.colony.io',
  })),
  withHandlers({
    getAbsoluteImagePath: ({ baseUrl, files, project }) => (
      imagePath: string,
    ) => {
      return imagePath.startsWith('http')
        ? imagePath
        : `${baseUrl}${
            files && files[`${project}/${imagePath}`]
              ? files[`${project}/${imagePath}`]
              : imagePath
          }`;
    },
  }),
  withProps(({ getAbsoluteImagePath }) => ({
    siteLogo: getAbsoluteImagePath('/img/colonyDocs_combomark.svg'),
  })),
);

export default enhance(SEO);
