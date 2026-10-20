import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import styles from './page.module.scss';

export default async function Home() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <main className={styles.home}>
      <h1 className={styles.title}>Find cloth manufacturers and dealers in one place</h1>
      <p className={styles.text}>
        Manufacturers post what they make. Dealers post what they need. Talk directly on WhatsApp.
      </p>
      <div className={styles.actions}>
        <Link href="/signup?role=seller" className={styles.primary}>
          I make cloth
        </Link>
        <Link href="/signup?role=dealer" className={styles.secondary}>
          I buy cloth
        </Link>
      </div>
    </main>
  );
}
