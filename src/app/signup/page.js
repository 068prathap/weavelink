import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import SignupForm from '@/components/SignupForm/SignupForm';
import styles from '@/styles/form.module.scss';

export const metadata = {
  title: 'Create account',
};

export default async function SignupPage({ searchParams }) {
  const session = await getSession();
  if (session) redirect('/dashboard');

  const { role } = await searchParams;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>Free for manufacturers and dealers</p>
      <SignupForm defaultRole={role === 'dealer' ? 'dealer' : 'seller'} />
    </main>
  );
}
