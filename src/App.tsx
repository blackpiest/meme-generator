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
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const onDownload = () => {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'meme_generator.jpg';
    link.click();
  };

  const onLoadImage = (file: File | null) => {
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target?.result as string;
      setImage(img);
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
