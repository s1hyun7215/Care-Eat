import styles from './Button.module.scss';

/**
 * 공통 Button 컴포넌트
 *
 * @param {'primary' | 'secondary' | 'ghost'} variant - 버튼 스타일
 * @param {'sm' | 'md' | 'lg'} size - 버튼 크기
 * @param {boolean} fullWidth - 가로 전체 너비 여부
 * @param {React.ReactNode} children - 버튼 내용
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
