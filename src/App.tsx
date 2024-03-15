import { useState } from 'react';
import styles from './App.module.css';
import MemeGenerator from './components/memeGenerator/MemeGenerator';
import SidePanel from './components/sidePanel/SidePanel';

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
      <SidePanel 
        color={color}
        file={file}
        lowerInputValue={lowerInputValue}
        setLowerInputValue={setLowerInputValue}
        onDownload={onDownload}
        setColor={setColor}
        setFile={setFile}
        setUpperInputValue={setUpperInputValue}
        upperInputValue={upperInputValue}
      />
      <MemeGenerator 
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
