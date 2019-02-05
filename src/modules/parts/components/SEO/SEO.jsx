/* @flow */
import type { RouteProps } from '@reach/router';

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import { Location } from '@reach/router';
import { compose, fromRenderProps } from 'recompose';

import type { FileContext as FileContextType } from '~types';

import FileContext from '~context/FileContext';

type Props = RouteProps & {
  description: string,
  files?: FileContextType,
  images: Array<string>,
  isDocPage: boolean,
  project: string,
  title: string,
};

class SEO extends Component<Props> {
  static displayName = 'parts.SEO';

  baseUrl = 'https://docs.colony.io';

  getAbsoluteImagePath = (imagePath: string) => {
    const { files, project } = this.props;
    return imagePath.startsWith('http')
      ? imagePath
      : `${this.baseUrl}${
          files && files[`${project}/${imagePath}`]
            ? files[`${project}/${imagePath}`]
            : imagePath
        }`;
  };

  render() {
    const siteLogo = this.getAbsoluteImagePath('/img/colonyDocs_combomark.svg');
    const {
      description,
      location,
      title,
      isDocPage = false,
      images = [siteLogo],
    } = this.props;

    const absolutePath =
      location && `${this.baseUrl}${withPrefix(location.pathname)}`;
    const imagePaths = images.map(this.getAbsoluteImagePath);
    if (imagePaths.indexOf(siteLogo) < 0) imagePaths.push(siteLogo);
    const ogType =
      location && location.pathname === '/' ? 'website' : 'article';
    const siteName = 'Colony Open Source Docs';

    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: this.baseUrl,
        name: siteName,
      },
    ];

    if (isDocPage) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': absolutePath,
                name: title,
                image: imagePaths[0],
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          author: 'Colony',
          url: absolutePath,
          name: title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: imagePaths[0],
          },
          description,
        },
      );
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        {imagePaths.map(imagePath => (
          <meta name="image" content={imagePath} key={imagePath} />
        ))}

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* Google+ tags */}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        {imagePaths.map(imagePath => (
          <meta itemProp="image" content={imagePath} key={imagePath} />
        ))}

        {/* OpenGraph tags */}
        <meta property="og:url" content={absolutePath} />
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteName} />
        {imagePaths.map(imagePath => (
          <meta property="og:image" content={imagePath} key={imagePath} />
        ))}

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@joincolony" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {imagePaths.map(imagePath => (
          <meta name="twitter:image" content={imagePath} key={imagePath} />
        ))}
      </Helmet>
    );
  }
}

const enhance = compose(
  // $FlowFixMe
  fromRenderProps(FileContext.Consumer, files => ({ files })),
  // $FlowFixMe
  fromRenderProps(Location, locationProps => ({ ...locationProps })),
);

export default enhance(SEO);
