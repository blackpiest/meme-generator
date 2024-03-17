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
      <input accept='.jpg,.png,.jpeg' className={styles.nativeInput} id={id} type='file' onChange={e => onChange?.(e.target.files?.[0] || null)} />
      <label className={classNames(styles.customInput, value && styles.hasFile, className)} htmlFor={id}>
        {!value && <span>Загрузите файл</span>}
        {value && <span className={styles.fileName}>
          {`Файл "${value.name}" загружен.`}
          <span className={styles.icon}></span>
        </span>}
      </label>
    </div>
  );
}
