'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '@/app/actions/auth';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import styles from '@/styles/form.module.scss';

function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {});

  return (
    <form action={formAction} className={styles.form} noValidate>
      {state.error && <p className={styles.formError} role="alert">{state.error}</p>}

      <div className={styles.field}>
        <label htmlFor="phone">Mobile number</label>
        <input id="phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel" defaultValue={state.phone} />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" name="password" autoComplete="current-password" />
      </div>

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>

      <p className={styles.switch}>
        New to WeaveLink? <Link href="/signup">Create an account</Link>
      </p>
    </form>
  );
}

export default LoginForm;
