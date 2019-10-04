/* @flow */

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { defineMessages } from 'react-intl';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import Paragraph from '~core/Paragraph';
import NewsletterCta from '~parts/NewsletterCta';
import { PAGE_INDEX } from '~routes';

import styles from './Blog.module.css';

const MSG = defineMessages({
  title: {
    id: 'pages.Website.HomePage.Blog.title',
    defaultMessage: 'Words, Ideas, Updates...',
  },
  readMore: {
    id: 'pages.Website.HomePage.Blog.readMore',
    defaultMessage: 'Read more',
  },
});

const displayName = 'pages.Website.HomePage.Blog';

const Blog = () => {
  const { posts } = useStaticQuery(graphql`
    {
      ...threeBlogPostsFragment
    }
  `);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <div className={styles.gridContainer}>
          {posts.edges.map(
            ({
              node: {
                id,
                custom_excerpt: customExcerpt,
                excerpt,
                feature_image: image,
                title,
                url,
              },
            }) => {
              const excerptText =
                customExcerpt || `${excerpt.substring(0, 85)}...`;
              return (
                <div key={id} className={styles.gridItem}>
                  <div className={styles.postContent}>
                    <Image alt={title} src={image} />
                    <Heading
                      appearance={{
                        size: 'mediumLarge',
                        theme: 'dark',
                        weight: 'medium',
                      }}
                      text={title}
                    />
                    {excerptText && <Paragraph text={excerptText} />}
                  </div>
                  <div className={styles.postLink}>
                    <Link
                      arrow="right"
                      className={styles.link}
                      href={url}
                      text={MSG.readMore}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
      <div className={styles.cta}>
        <NewsletterCta
          id={`${displayName}.newsletterCta`}
          pageName="Home Page (Blog Section)"
          pageUri={`https://colony.io${PAGE_INDEX}`}
        />
      </div>
    </div>
  );
};

Blog.displayName = displayName;

export default Blog;
