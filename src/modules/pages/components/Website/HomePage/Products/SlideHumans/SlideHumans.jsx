/* @flow */
/* eslint-disable prettier/prettier, max-len */

import React from 'react';

import screenGraphic from './screenGraphic';
import avatarGraphic from './avatarGraphic';

import styles from './SlideHumans.module.css';

const displayName = 'pages.Website.HomePage.Products.SlideHumans';

/*
 * Using inline svg here so that we can make it interactive
 */
const SlideHumans = () => (
  <div className={styles.main}>
    <svg
      className={styles.image}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1440 875"
    >
      <defs>
        <linearGradient id="a" x1="718.98" x2="720.78" y1="446.45" y2="849.01" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#c8d2dc" />
        </linearGradient>
        <clipPath id="b">
          <circle cx="1400.67" cy="75.51" r="19.6" fill="none" />
        </clipPath>
      </defs>
      <image width="1440" height="900" transform="translate(0 38.51)" xlinkHref={screenGraphic} />
      <path fill="url(#a)" d="M0 340.27h1439.41v535.17H0z" opacity=".65" style={{ mixBlendMode: 'multiply' }} />
      <image width="112" height="118" transform="translate(1375.38 48.43) scale(0.44)" xlinkHref={avatarGraphic} />
      <circle cx="240.83" cy="164.72" r="16" fill="#289bdc" />
      <circle cx="1013.19" cy="394.2" r="16" fill="#289bdc" />
      <circle cx="1167.27" cy="285.09" r="16" fill="#289bdc" />
      <circle cx="240.83" cy="164.72" r="25" fill="#289bdc" className={styles.handle} />
      <circle cx="1013.19" cy="394.2" r="25" fill="#289bdc" className={styles.handle} />
      <circle cx="1167.27" cy="285.09" r="25" fill="#289bdc" className={styles.handle} />
      <circle cx="181.22" cy="238.67" r="66.07" fill="#fff" data-name="Layer 2" />
      <circle cx="183.37" cy="205.45" r="10.26" fill="#00284b" />
      <circle cx="183.37" cy="266.18" r="10.26" fill="#00284b" />
      <circle cx="213.62" cy="235.81" r="10.26" fill="#00284b" />
      <circle cx="153" cy="235.81" r="10.26" fill="#00284b" />
      <path fill="#00284b" d="M166.8952904 235.79653747l16.48265907-16.48265907 16.48265907 16.48265907-16.48265907 16.48265907zM201.86 217.31v-17.64l17.65 17.64h-17.65zM164.76 217.31h-17.64l17.64-17.64v17.64zM164.76 254.31v17.64l-17.64-17.64h17.64zM201.86 254.31h17.65l-17.65 17.64v-17.64z" />
      <path fill="#c8d2dc" d="M1424 1a15 15 0 0 1 15 15v21.31H1V16A15 15 0 0 1 16 1h1408m0-1H16A16 16 0 0 0 0 16v22.31h1440V16a16 16 0 0 0-16-16z" />
      <path fill="#c8d2dc" d="M32.69 13.25a5.91 5.91 0 1 1-5.9 5.9 5.91 5.91 0 0 1 5.9-5.9m0-1a6.91 6.91 0 1 0 6.9 6.9 6.9 6.9 0 0 0-6.9-6.9zM60 13.25a5.91 5.91 0 1 1-5.9 5.9 5.91 5.91 0 0 1 5.9-5.9m0-1a6.91 6.91 0 1 0 6.91 6.9 6.9 6.9 0 0 0-6.91-6.9zM87.36 13.25a5.91 5.91 0 1 1-5.9 5.9 5.9 5.9 0 0 1 5.9-5.9m0-1a6.91 6.91 0 1 0 6.9 6.9 6.9 6.9 0 0 0-6.9-6.9z" />
      <path fill="none" stroke="#c8d2dc" strokeMiterlimit="10" d="M119.76.37v37.56" />
      <text fill="#c8d2dc" fontFamily="ArialMT,Arial" fontSize="12" letterSpacing=".02001953em" transform="translate(146.03 22.95)">
      ww 
        <tspan x="17.81" y="0" letterSpacing="-.03515625em">w</tspan>
        <tspan x="26.06" y="0" letterSpacing=".01997884em">.colon</tspan>
        <tspan x="59.52" y="0" letterSpacing="-.05423991em">y</tspan>
        <tspan x="64.87" y="0">.io</tspan>
      </text>
      <path fill="#c8d2dc" d="M1439 39v835.44H1V39h1438m1-1H0v837.44h1440V38z" />
      <path fill="#c8d2dc" d="M1439 39v835.44H1V39h1438m1-1H0v837.44h1440V38z" />
    </svg>
  </div>
);

SlideHumans.displayName = displayName;

export default SlideHumans;
