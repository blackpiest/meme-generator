import styles from './sidePanel.module.css';

interface Props {
  upperInputValue: string;
  setUpperInputValue: (value: string) => void;
  lowerInputValue: string;
  setLowerInputValue: (value: string) => void;
  setColor: (color: string) => void;
  color: string;
  setFile: (file: File | null) => void;
  file: File | null;
  onDownload: () => void;
}

export default function SidePanel({
  color, file, lowerInputValue, onDownload, setColor, setFile, setLowerInputValue, setUpperInputValue, upperInputValue
}: Props) {
  return (
    <aside className={styles.panel}>
      <input 
        placeholder='Вверхний текст' 
        value={upperInputValue} 
        maxLength={50}
        onChange={(e) => setUpperInputValue(e.target.value)} 
      />
      <input 
        placeholder='Нижний текст' 
        value={lowerInputValue}
        onChange={(e) => setLowerInputValue(e.target.value)} 
        maxLength={40}
      />
      <input type='file' onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <div className={styles.colors}>
        <button onClick={() => setColor('white')} className={styles.color}>White</button>
        <button onClick={() => setColor('black')} className={styles.color}>Black</button>
        <button onClick={() => setColor('blue')} className={styles.color}>Blue</button>
        <button onClick={() => setColor('red')} className={styles.color}>Red</button>
      </div>
      <button onClick={onDownload}>Скачать</button>
    </aside>
  );
}
