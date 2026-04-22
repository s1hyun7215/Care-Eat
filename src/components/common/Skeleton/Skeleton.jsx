import styles from './Skeleton.module.scss';

/**
 * Skeleton placeholder
 *
 * @param {number | string} width - 너비
 * @param {number | string} height - 높이
 * @param {'text' | 'rect' | 'circle'} variant - 모양
 */
function Skeleton({ width = '100%', height = 16, variant = 'text' }) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]}`}
      style={style}
    />
  );
}

export default Skeleton;
