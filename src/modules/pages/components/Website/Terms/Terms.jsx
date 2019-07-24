/* @flow */

import type { MessageDescriptor } from 'react-intl';

import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import type { Appearance as HeadingAppearance } from '~core/Heading';

import Heading from '~core/Heading';
import Icon from '~core/Icon';
import WebsiteLayout from '~layouts/WebsiteLayout';

import styles from './Terms.module.css';

const MSG = defineMessages({
  bodyCookies: {
    id: 'pages.Website.Terms.bodyCookies',
    defaultMessage: `Cookies are small amounts of information which we may
      store on your computer. Cookies make it easier for you to log on to
      and use the site during future visits. They also allow us to monitor
      website traffic and to personalise the content of the Site for you.
      You may set up your computer to reject all or some cookies although,
      in that case, you may not be able to use certain features on the Site.
      If you do not wish to receive cookies in the future, please let us know.
      {br}{br}
      The following cookies are used by us:
      {br}{br}
      Google Analytics
      {br}
      Hotjar
      {br}
      Intercom
      {br}
      We reserve the right to modify this Policy from time to time.`,
  },
  bodyPrivacyInformation: {
    id: 'pages.Website.Terms.bodyPrivacyInformation',
    defaultMessage: `The data controller who is responsible for your personal
      data is Collectively Intelligent Ltd, 3 Butler House, 49-51 Curtain Rd,
      London, EC2A 3PT.
      {br}{br}
      If you have any questions or concerns relating to your personal data or
      this Policy, please contact us using the following contact details:
      {br}{br}
      Data Controller: privacy@colony.io
      {br}{br}
      Collectively Intelligent Ltd,
      {br}
      3 Butler House,
      {br}
      49-51 Curtain Rd,
      {br}
      London EC2A 3PT,
      {br}
      England
      {br}{br}
      Whilst you have the right to make a complaint at any time to the
      Informational Commissioner’s Office (www.ico.org.uk), we would like to
      have a chance to deal with any concerns before you approach the ICO.
      {br}{br}
      Changes to This Policy and Your Duty to Let Us Know of Changes
      This Policy was last updated on 29th June 2018. We may need to make
      updates or changes to this Policy from time to time. We will inform you
      of any such
      changes.
      {br}{br}
      Please let us know if your personal data changes during your relationship
      with us so that we can update our records.`,
  },
  bodyPrivacyPolicy: {
    id: 'pages.Website.Terms.bodyPrivacyPolicy',
    defaultMessage: `Colony Foundation Limited of c/o McGrath Tonner
      Corporate Services Limited, 5th Floor, Genesis Building, Genesis Close,
      PO BOX 446, Grand Cayman, KY1-1106 Cayman Islands ("we" or “us”) are
      committed to protecting and respecting your privacy.
      {br}{br}
      This policy (together with our terms of use) sets out the limited
      basis on which any personal data we collect from you, or that you
      provide to us, will be processed by us when you use our decentralised
      network built on the Ethereum Blockchain (“Colony”). Please read the
      following carefully to understand our views and practices regarding
      your personal data and how we will treat it.
      {br}{br}
      This privacy policy (the “Policy”) applies to personal data that we
      collect from you for the purposes set out below. To the extent that
      use of Colony for the purposes described in the whitepaper results in
      us processing personal data for additional limited purposes this Policy
      shall apply to such further purposes.
      {br}{br}
      It is important that you read this Policy so that you are fully aware
      of how and why we are using your data. We do not knowingly collect
      data relating to children.`,
  },
  bodyTermsChanges: {
    id: 'pages.Website.Terms.bodyTermsChanges',
    defaultMessage: `We may update our site and apps from time to time, and
      may change the content at any time. However, please note that any of
      the content on our site or apps may be out of date at any given time,
      and we are under no obligation to update it.
      We do not guarantee that our site and apps, or any content on them,
      will be free from errors or omissions.`,
  },
  bodyTermsInformation: {
    id: 'pages.Website.Terms.bodyTermsInformation',
    defaultMessage: `Our Site is a site operated by The Colony Foundation
      Limited (we, our or us). We are registered in the Cayman Islands under
      company number 325182, and have our registered office at 5th Floor,
      Genesis Building, Genesis Close, PO Box 446, Grand Cayman, KY1-1106
      {br}{br}
      We are a limited company and Colony is our trading name.`,
  },
  bodyTermsOther: {
    id: 'pages.Website.Terms.bodyTermsOther',
    defaultMessage: `These terms of use refer to the following additional
      terms, which also apply to your use of our site and apps:
      {br}{br}
      - Our Privacy Policy, which sets out the terms on which we process
        any personal data we collect from you, or that you provide to us.
        By using our site or apps, you consent to such processing and you
        warrant that all data provided by you is accurate.
      {br}
      - Our Cookie Policy, which sets out information about the cookies
        on our site.`,
  },
  bodyTermsService: {
    id: 'pages.Website.Terms.bodyTermsService',
    defaultMessage: `This Terms of Use Policy (together with the
      documents referred to in it) tells you the terms of use on
      which you may make use of our website https://colony.io
      (our site) and any of our applications from time to time
      (apps), whether as a guest or a registered user. Use of our
      site and apps includes accessing, browsing, downloading from,
      uploading to, creating material on or registering to use our site.
      {br}{br}
      Please read these terms of use carefully before you start to use
      our site or apps, as these will apply to your use of our site
      and apps.
      {br}{br}
      In particular we draw your attention to the section on user
      relationships that explains you alone are responsible for any
      relationship or arrangement you enter into with other users of
      the site.
      {br}{br}
      We recommend that you print a copy of this for future reference.
      {br}{br}
      By using our site and apps, you confirm that you accept these
      terms of use and that you agree to comply with them.
      {br}{br}
      If you do not agree to these terms of use, you must not use our
      site or apps.`,
  },
  pageTitle: {
    id: 'pages.Website.Terms.pageTitle',
    defaultMessage: 'Terms of Service',
  },
  titleCookes: {
    id: 'pages.Website.Terms.titleCookes',
    defaultMessage: 'Cookies',
  },
  titlePrivacyInformation: {
    id: 'pages.Website.Terms.titlePrivacyInformation',
    defaultMessage: 'Important Information and Who We Are',
  },
  titlePrivacyPolicy: {
    id: 'pages.Website.Terms.titlePrivacyPolicy',
    defaultMessage: 'Privacy Policy',
  },
  titleTermsChanges: {
    id: 'pages.Website.Terms.titleTermsChanges',
    defaultMessage: 'Changes to Our Site and Apps',
  },
  titleTermsInformation: {
    id: 'pages.Website.Terms.titleTermsInformation',
    defaultMessage: 'Information About Us',
  },
  titleTermsOther: {
    id: 'pages.Website.Terms.titleTermsOther',
    defaultMessage: 'Other Applicable Terms',
  },
  titleTermsService: {
    id: 'pages.Website.Terms.titleTermsService',
    defaultMessage: 'Terms of Website and App Use',
  },
});

const sectionHeadingAppearance = {
  margin: 'double',
  size: 'mediumLarge',
  theme: 'dark',
  weight: 'medium',
};

const subHeadingAppearance = {
  margin: 'double',
  size: 'normal',
  theme: 'dark',
  weight: 'medium',
};

const Section = ({
  body,
  headingAppearance,
  title,
}: {
  body: MessageDescriptor,
  headingAppearance: HeadingAppearance,
  title: MessageDescriptor,
}) => (
  <>
    <Heading appearance={headingAppearance} text={title} />
    <p>
      <FormattedMessage {...body} values={{ br: <br /> }} />
    </p>
  </>
);

const displayName = 'pages.Website.Terms';

const Terms = () => (
  <WebsiteLayout>
    <div className={styles.main}>
      <Heading appearance={{ theme: 'dark' }} text={MSG.pageTitle} />
      <div className={styles.contentContainer}>
        <div className={styles.sidebar} />
        <div className={styles.body}>
          <Section
            body={MSG.bodyTermsService}
            headingAppearance={sectionHeadingAppearance}
            title={MSG.titleTermsService}
          />
          <Section
            body={MSG.bodyTermsOther}
            headingAppearance={subHeadingAppearance}
            title={MSG.titleTermsOther}
          />
          <Section
            body={MSG.bodyTermsInformation}
            headingAppearance={subHeadingAppearance}
            title={MSG.titleTermsInformation}
          />
          <Section
            body={MSG.bodyTermsChanges}
            headingAppearance={subHeadingAppearance}
            title={MSG.titleTermsChanges}
          />
          <div className={styles.divider}>
            <Icon
              className={styles.dividerIcon}
              name="divider"
              title={MSG.titlePrivacyPolicy}
              viewBox="0 0 39 16"
            />
          </div>
          <Section
            body={MSG.bodyPrivacyPolicy}
            headingAppearance={sectionHeadingAppearance}
            title={MSG.titlePrivacyPolicy}
          />
          <Section
            body={MSG.bodyPrivacyInformation}
            headingAppearance={subHeadingAppearance}
            title={MSG.titlePrivacyInformation}
          />
          <div className={styles.divider}>
            <Icon
              className={styles.dividerIcon}
              name="divider"
              title={MSG.titlePrivacyPolicy}
              viewBox="0 0 39 16"
            />
          </div>
          <Section
            body={MSG.bodyCookies}
            headingAppearance={sectionHeadingAppearance}
            title={MSG.titleCookes}
          />
        </div>
      </div>
    </div>
  </WebsiteLayout>
);

Terms.displayName = displayName;

export default Terms;
