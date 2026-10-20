import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import LoginForm from '@/components/LoginForm/LoginForm';
import styles from '@/styles/form.module.scss';

export const metadata = {
  title: 'Login',
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Use your mobile number and password</p>
      <LoginForm />
    </main>
  );
}
