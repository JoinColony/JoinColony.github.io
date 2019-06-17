/* @flow */

import { injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';

import { transformProjectData } from '~utils/docs';

import HomePageContent from './HomePageContent.jsx';

const enhance = compose(
  injectIntl,
  withProps(({ intl: { locale }, projects }) => ({
    projects: projects.map(project => transformProjectData(project, locale)),
  })),
);

export default enhance(HomePageContent);
