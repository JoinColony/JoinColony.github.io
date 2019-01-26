import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby-link';
import { Location } from '@reach/router';
import { compose, fromRenderProps } from 'recompose';
import FileContext from '../../contexts/FileContext';

class SEO extends Component {
  constructor(props) {
    super(props);

    this.getAbsoluteImagePath = this.getAbsoluteImagePath.bind(this);
  }

  baseUrl = 'https://docs.colony.io';

  getAbsoluteImagePath(imagePath) {
    const { files, project } = this.props;
    return imagePath.startsWith('http')
      ? imagePath
      : `${this.baseUrl}${
          files && files[`${project}/${imagePath}`]
            ? files[`${project}/${imagePath}`]
            : imagePath
        }`;
  }

  render() {
    const siteLogo = this.getAbsoluteImagePath('/img/colonyDocs_combomark.svg');
    const {
      description,
      location,
      title,
      isDocPage = false,
      images = [siteLogo],
    } = this.props;

    const absolutePath = `${this.baseUrl}${withPrefix(location.pathname)}`;
    const imagePaths = images.map(this.getAbsoluteImagePath);
    if (imagePaths.indexOf(siteLogo) < 0) imagePaths.push(siteLogo);
    const ogType = location.pathname === '/' ? 'website' : 'article';
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
        }
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
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        {imagePaths.map(imagePath => (
          <meta itemprop="image" content={imagePath} key={imagePath} />
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
  fromRenderProps(FileContext.Consumer, files => ({ files })),
  fromRenderProps(Location, locationProps => ({ ...locationProps }))
);

export default enhance(SEO);
