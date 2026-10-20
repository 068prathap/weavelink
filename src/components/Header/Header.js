import Link from 'next/link';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Weave<span>Link</span>
        </Link>
        <Link href="/login" className={styles.login}>
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;
