import React from 'react'
import Link from '../components/Link'

import styles from './404.module.css'

const NotFoundPage = () => (
  <main className={styles.main}>
    <div className={styles.content}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link href={'/'}>Home</Link>
    </div>
  </main>
)

export default NotFoundPage
