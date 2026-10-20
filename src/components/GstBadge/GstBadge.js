import styles from './GstBadge.module.scss';

const labels = {
  verified: 'GST verified',
  pending: 'GST verification pending',
  rejected: 'Unverified',
  none: 'Unverified',
};

function GstBadge({ status = 'none' }) {
  return <span className={`${styles.badge} ${styles[status]}`}>{labels[status]}</span>;
}

export default GstBadge;
