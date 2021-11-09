import { FormEventHandler, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Notification from '../ui/notification';
import classes from './contact-form.module.css';

const sendContactData = async (contactDetails: {
  email: string;
  name: string;
  message: string;
}) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
};

const ContactForm: React.FC = ({}) => {
  const [enteredEmail, setEnteredEmail] = useState<string>('');
  const [enteredName, setEnteredName] = useState<string>('');
  const [enteredMessage, setEnteredMessage] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<
    'pending' | 'success' | 'error' | 'waiting'
  >('waiting');
  const [requestError, setRequestError] = useState<string | null>();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('waiting');
        setRequestError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler: FormEventHandler = async (event) => {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredName('');
      setEnteredEmail('');
      setEnteredMessage('');
    } catch (error) {
      const errMsg = (error as { message: string }).message;
      setRequestError(errMsg);
      setRequestStatus('error');
    }
  };

  let notification: {
    status: 'pending' | 'success' | 'error' | 'waiting';
    title: string;
    message: string;
  } = {
    status: requestStatus,
    title: '',
    message: '',
  };

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'message sent successfully',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError!,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              value={enteredEmail}
              onChange={(e) => setEnteredEmail(e.target.value)}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              value={enteredName}
              onChange={(e) => setEnteredName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows={5}
            value={enteredMessage}
            onChange={(e) => setEnteredMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      <CSSTransition
        in={notification.status != 'waiting'}
        timeout={2000}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes.slide_in_up_enter,
          enterActive: classes.slide_in_up_enter_active,
          exit: classes.slide_in_up_exit,
          exitActive: classes.slide_in_up_exit_active,
        }}
      >
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      </CSSTransition>
      {/*notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )*/}
    </section>
  );
};

export default ContactForm;
