import { FiInbox } from 'react-icons/fi';
import styles from './EmptyState.module.scss';

/**
 * 데이터 없음 상태 UI
 *
 * @param {string} title - 제목
 * @param {string} subtitle - 부가 설명
 * @param {React.ReactNode} icon - 커스텀 아이콘 (선택)
 * @param {React.ReactNode} action - 액션 버튼 등 (선택)
 */
function EmptyState({ title, subtitle, icon, action }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        {icon || <FiInbox size={48} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
