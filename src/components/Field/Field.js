import PasswordInput from '@/components/PasswordInput/PasswordInput';
import styles from '@/styles/form.module.scss';

function Field({ label, name, error, hint, type, children, ...props }) {
  const Input = type === 'password' ? PasswordInput : 'input';

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      {children || <Input id={name} name={name} type={type} aria-invalid={!!error} {...props} />}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Field;
