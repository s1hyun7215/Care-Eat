import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>페이지를 찾을 수 없어요</h2>
        <p className={styles.subtitle}>
          주소가 잘못되었거나 더 이상 존재하지 않는 페이지예요.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
