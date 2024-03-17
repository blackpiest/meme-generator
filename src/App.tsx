import { useState } from 'react';
import styles from './App.module.css';
import MemeGenerator from './components/memeGenerator/MemeGenerator';
import SidePanel from './components/sidePanel/SidePanel';
import generateHash from './lib/generateHash';

function App() {
  const [upperInputValue, setUpperInputValue] = useState<string>('');
  const [lowerInputValue, setLowerInputValue] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState<string>('black');
  const [dataURL, setDataURL] = useState<string>('');
  const [isFileLoading, setFileLoading] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const onDownload = () => {
    const hash = generateHash(8);
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `meme_generator_${hash}.jpg`;
    link.click();
  };

  const onLoadImage = (file: File | null) => {
    if (!file) return;
    setFileLoading(true);
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target?.result as string;
      setFile(file);
      setImage(img);
      setFileLoading(false);
    };
  
    reader.readAsDataURL(file);
  };
  
  return (
    <main className={styles.main}>
      <div className={styles.sidePanelContainer}>
        <h1 className={styles.headline}>Meme generator</h1>
        <SidePanel 
          color={color}
          file={file}
          lowerInputValue={lowerInputValue}
          setLowerInputValue={setLowerInputValue}
          onDownload={onDownload}
          setColor={setColor}
          setFile={onLoadImage}
          setUpperInputValue={setUpperInputValue}
          upperInputValue={upperInputValue}
          className={styles.sidePanel}
          isFileLoading={isFileLoading}
        />
      </div>
     
      <div className={styles.canvasContainer}>
        <MemeGenerator 
          className={styles.canvas} 
          image={image} 
          lowerText={lowerInputValue} 
          upperText={upperInputValue} 
          color={color} 
          setDataURL={setDataURL}
        />
      </div>
     
    </main>
  );
}

export default App;
