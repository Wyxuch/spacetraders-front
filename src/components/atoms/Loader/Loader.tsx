import styles from './Loader.module.css';

const Loader = ({ size = 50, color = '#6d28d9' }: { size?: number; color?: string }) => {
  return (
    <span className={styles.loader} style={{ width: size, height: size, border: `${size / 10}px solid ${color}` }}>
      <span
        className={styles.loaderAfter}
        style={{ width: size, height: size, border: `${size / 10}px solid ${color}` }}
      ></span>
    </span>
  );
};

export default Loader;
