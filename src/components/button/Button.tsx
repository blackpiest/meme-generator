import classNames from 'classnames';
import styles from './button.module.css';

interface Props {
  className?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({children, className, disabled, icon, onClick}: Props) {
  return (
    <button disabled={disabled} onClick={onClick} className={classNames(styles.btn, className)}>
      {children}
      {Boolean(icon) && <span className={styles.iconContainer}>{icon}</span>}
    </button>
  );
}
