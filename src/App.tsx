import { useState } from 'react';
import styles from './App.module.css';
import Canvas from './components/canvas/Canvas';

function App() {
  const [upperInputValue, setUpperInputValue] = useState<string>('');
  const [lowerInputValue, setLowerInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string>('black');
  const [dataURL, setDataURL] = useState<string>('');

  const onDownload = () => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meme_generator.jpg';
    link.click();
  }

  return (
    <main className={styles.main}>
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
      <Canvas 
        className={styles.canvas} 
        imageFile={file} 
        lowerText={lowerInputValue} 
        upperText={upperInputValue} 
        color={color} 
        setDataURL={setDataURL}
        />
    </main>
  );
}

export default App;
