import classNames from 'classnames';
import styles from './colorPallete.module.css';

interface Props {
  className?: string;
  value: string;
  onChange?: (value: string) => void;
  colors: string[];
}

export default function ColorPallete({colors, value, className, onChange}: Props) {
  return (
    <div className={classNames(styles.container, className)}>
      {colors.map(item => (
        <button onClick={() => onChange?.(item)} key={item} className={classNames(styles.btn, value === item && styles.selected)} style={{backgroundColor: item}}>{item}</button>
      ))}
    </div>
  );
}
