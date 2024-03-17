import { useId } from 'react';
import styles from './fileInput.module.css';
import classNames from 'classnames';

interface Props {
  className?: string;
  value: File | null;
  onChange?: (file: File | null) => void;
}

export default function FileInput({value, className, onChange}: Props) {
  const id = useId();
  return (
    <div className={styles.container}>
      <input className={styles.nativeInput} id={id} type='file' onChange={e => onChange?.(e.target.files?.[0] || null)} />
      <label className={classNames(styles.customInput, className)} htmlFor={id}>
        {!value && <span>Загрузите файл</span>}
        {value && <span>{`Файл "${value.name}" загружен.`}</span>}
      </label>
    </div>
  );
}
