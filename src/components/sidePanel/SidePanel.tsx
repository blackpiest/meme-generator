import Button from '../button/Button';
import ColorPallete from '../colorPallete/ColorPallete';
import FileInput from '../fileInput/FileInput';
import Input from '../input/Input';
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
  const isCanvasEmpty = !file && !lowerInputValue && !upperInputValue;
  return (
    <aside className={styles.panel}>
      <FileInput
        value={file}
        onChange={setFile}
        className={styles.fileInput}
      />
      <Input
        value={upperInputValue} 
        maxLength={50}
        onChange={setUpperInputValue} 
        label='Вверхний текст'
      />
      <Input
        label='Нижний текст' 
        value={lowerInputValue}
        onChange={setLowerInputValue} 
        maxLength={40}
      />
      <ColorPallete
        colors={['white', 'black', 'blue', 'red']}
        value={color}
        onChange={setColor}
        className={styles.colors}
      />
      <Button disabled={isCanvasEmpty} onClick={onDownload}>Скачать</Button>
    </aside>
  );
}
