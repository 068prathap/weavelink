'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';
import Field from '@/components/Field/Field';
import styles from '@/styles/form.module.scss';

function SignupForm({ defaultRole }) {
  const [state, formAction, isPending] = useActionState(signup, { errors: {}, values: { role: defaultRole } });
  const { errors = {}, values = {} } = state;

  return (
    <form action={formAction} className={styles.form} noValidate>
      <fieldset className={styles.choices}>
        <legend>I am a</legend>
        <label className={styles.choice}>
          <input type="radio" name="role" value="seller" defaultChecked={values.role === 'seller'} />
          <strong>Seller</strong>
          <span>I make cloth</span>
        </label>
        <label className={styles.choice}>
          <input type="radio" name="role" value="dealer" defaultChecked={values.role === 'dealer'} />
          <strong>Dealer</strong>
          <span>I buy cloth</span>
        </label>
      </fieldset>
      {errors.role && <p className={styles.error}>{errors.role}</p>}

      <Field label="Company name" name="companyName" defaultValue={values.companyName} error={errors.companyName} autoComplete="organization" />
      <Field label="Owner name" name="ownerName" defaultValue={values.ownerName} error={errors.ownerName} autoComplete="name" />
      <Field
        label="Mobile number"
        name="phone"
        type="tel"
        inputMode="numeric"
        defaultValue={values.phone}
        error={errors.phone}
        autoComplete="tel"
        hint="You will use this number to login"
      />
      <Field label="Password" name="password" type="password" error={errors.password} autoComplete="new-password" />

      <div className={styles.row}>
        <Field label="Town" name="town" defaultValue={values.town} error={errors.town} />
        <Field label="District" name="district" defaultValue={values.district} error={errors.district} />
      </div>

      <Field
        label="GSTIN (optional)"
        name="gstin"
        defaultValue={values.gstin}
        error={errors.gstin}
        autoCapitalize="characters"
        maxLength={15}
        hint="Without GSTIN your account will show as Unverified"
      />

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? 'Creating account...' : 'Create account'}
      </button>

      <p className={styles.switch}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}

export default SignupForm;
