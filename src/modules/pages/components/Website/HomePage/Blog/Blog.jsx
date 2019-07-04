/* @flow */

import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';
import GhostContentAPI from '@tryghost/content-api';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import NewsletterCta from '~parts/NewsletterCta';

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const api = new GhostContentAPI({
      url: 'https://blog.colony.io',
      key: 'd16b83be344ceec36b007c34b0',
      version: 'v2',
    });

    api.posts
      .browse({ limit: 3 })
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <Heading appearance={{ theme: 'dark' }} text={MSG.title} />
        <div className={styles.gridContainer}>
          {posts.map(
            ({
              id,
              custom_excerpt: excerpt,
              feature_image: image,
              title,
              url,
            }) => (
              <div key={id} className={styles.gridItem}>
                <div className={styles.postContent}>
                  <Image alt={title} src={image} />
                  <Heading
                    appearance={{ size: 'mediumLarge', theme: 'dark' }}
                    text={title}
                  />
                  {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
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
            ),
          )}
        </div>
        <div className={styles.cta}>
          <NewsletterCta id={`${displayName}.newsletterCta`} />
        </div>
      </div>
    </div>
  );
};

Blog.displayName = displayName;

export default Blog;
