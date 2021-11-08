import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';

import ContactForm from '../components/contact/contact-form';

const ContactPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta name='description' content='Send me your messages!' />
      </Head>
      <ContactForm />
    </Fragment>
  );
};

export default ContactPage;
