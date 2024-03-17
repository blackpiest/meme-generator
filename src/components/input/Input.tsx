import classNames from 'classnames';
import styles from './input.module.css';
import { useId } from 'react';

interface Props {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  label?: string;
  maxLength?: number;
  placeholder?: string;
}

export default function Input({label,value, className, onChange, placeholder, maxLength}: Props) {
  const id = useId();
  return (
    <div className={styles.container}>
      {Boolean(label) && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input maxLength={maxLength} placeholder={placeholder} id={id} type='text' value={value} onChange={(e) => onChange?.(e.target.value)} className={classNames(styles.input, className)} />
    </div>
  );
}
