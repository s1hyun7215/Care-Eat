import styles from './LoadingSpinner.module.scss';

/**
 * 로딩 스피너
 *
 * @param {'sm' | 'md' | 'lg'} size - 스피너 크기
 * @param {string} message - 로딩 중 표시할 메시지 (선택)
 */
function LoadingSpinner({ size = 'md', message }) {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.spinner} ${styles[size]}`} />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
