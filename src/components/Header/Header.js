import Link from 'next/link';
import { getSession } from '@/lib/session';
import styles from './Header.module.scss';

async function Header() {
  const session = await getSession();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={session ? '/dashboard' : '/'} className={styles.logo}>
          Weave<span>Link</span>
        </Link>
        <Link href={session ? '/dashboard' : '/login'} className={styles.login}>
          {session ? 'Dashboard' : 'Login'}
        </Link>
      </div>
    </header>
  );
}

export default Header;
