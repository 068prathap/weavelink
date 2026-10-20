'use client';

import { useState } from 'react';
import styles from './PasswordInput.module.scss';

function EyeIcon({ open }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {!open && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
  );
}

function PasswordInput(props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.wrap}>
      <input {...props} type={visible ? 'text' : 'password'} />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
      >
        <EyeIcon open={visible} />
      </button>
    </div>
  );
}

export default PasswordInput;
