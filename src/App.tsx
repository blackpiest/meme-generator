import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './App.module.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [upperInputValue, setUpperInputValue] = useState('');
  const [lowerInputValue, setLowerInputValue] = useState('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(16 * 1.2);
  const [color, setColor] = useState('black');

  const drawText = useCallback((canvas: HTMLCanvasElement, text: string, x: number, y: number, maxWidth: number, baseline: 'top' | 'bottom') => {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas context not found');
    }

    context.font = `${fontSize}px Arial`;
    context.textBaseline = baseline;
    context.fillStyle = color;
    context.textAlign = 'center';
  
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    words.forEach((word) => {
      const metrics = context.measureText(word);
      const wordWidth = metrics.width;
  
      if (line === '') {
        line = word;
      } else {
        const testLine = line + ' ' + word;
        const testWidth = context.measureText(testLine).width;
  
        if (testWidth > maxWidth) {
          context.fillText(line, x, currentY);
          line = word;
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
  
      if (wordWidth > maxWidth) {
        const characters = word.split('');
        let tempLine = '';
  
        characters.forEach((character) => {
          if (context.measureText(tempLine + character).width > maxWidth) {
            context.fillText(tempLine, x, currentY);
            tempLine = character;
            currentY += lineHeight;
          } else {
            tempLine += character;
          }
        });
  
        context.fillText(tempLine, x, currentY);
        line = '';
        currentY += lineHeight;
      }
    });
  
    context.fillText(line, x, currentY);
  }, [color, fontSize, lineHeight]);

  function drawImage(canvas: HTMLCanvasElement, image: HTMLImageElement | null) {
    if (!image || !canvas) return;

    let scaleFactor = 1;
    const aspectRatio = image.width / image.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    if (aspectRatio > canvasAspectRatio) {
      scaleFactor = canvas.width / image.width;
    } else {
      scaleFactor = canvas.height / image.height;
    }
    const scaledWidth = image.width * scaleFactor;
    const scaledHeight = image.height * scaleFactor;
    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;
    canvas.getContext('2d')?.drawImage(image, x, y, scaledWidth, scaledHeight);
  }

  function clearCanvas(canvas: HTMLCanvasElement) {
    const context = canvas?.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  const drawCanvas = useCallback((canvas: HTMLCanvasElement) => {
    clearCanvas(canvas);
    drawImage(canvas, image);
    drawText(canvas, upperInputValue, canvas.width / 2, canvas.height / 20, canvas.width - 10, 'top');
    drawText(canvas, lowerInputValue, canvas.width / 2, canvas.height - (canvas.height / 20), canvas.width - 10, 'bottom');
  }, [drawText, image, lowerInputValue, upperInputValue]);

  const onDownload = () => {
    if (!canvasRef.current) return;
    const oldSize = canvasRef.current.width;
    canvasRef.current.width = 500;
    canvasRef.current.height = 500;
    drawCanvas(canvasRef.current);

    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/jpeg');
    link.download = 'meme_generator.jpg';
    link.click();
    canvasRef.current.width = oldSize;
    canvasRef.current.height = oldSize;
    drawCanvas(canvasRef.current);
  };

  const onUpload = (files: FileList | null) => {
    const file = files?.item(0);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
  
      img.onload = function() {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const aspectRatio = img.width / img.height;
        const canvasAspectRatio = canvas.width / canvas.height;
        let scaleFactor = 1;
  
        if (aspectRatio > canvasAspectRatio) {
          scaleFactor = canvas.width / img.width;
        } else {
          scaleFactor = canvas.height / img.height;
        }
  
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;
  
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
        setUpperInputValue('');
        setLowerInputValue('');
      };
  
      img.src = event.target?.result as string;
      setImage(img);
    };
  
    reader.readAsDataURL(file);
  };

  const onChangeColor = (color: string) => {
    if (!canvasRef.current) return;
    setColor(color);
    drawCanvas(canvasRef.current);
  };

  useEffect(() => {
    function resize() {
      if (!containerRef.current || !canvasRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      canvasRef.current.width = width;
      canvasRef.current.height = height;

      setFontSize(canvasRef.current.height / 12);
      setLineHeight((canvasRef.current.height / 12) * 1.2);
      drawCanvas(canvasRef.current);
    }
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [drawCanvas]);

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
        <input type='file' onChange={(e) => onUpload(e.target.files)} />
        <div className={styles.colors}>
          <button onClick={() => onChangeColor('white')} className={styles.color}>White</button>
          <button onClick={() => onChangeColor('black')} className={styles.color}>Black</button>
          <button onClick={() => onChangeColor('blue')} className={styles.color}>Blue</button>
          <button onClick={() => onChangeColor('red')} className={styles.color}>Red</button>
        </div>
        <button onClick={onDownload}>Скачать</button>
      </aside>
      <div ref={containerRef} className={styles.container}>
        <canvas className={styles.canvas} ref={canvasRef} />
      </div>
    </main>
  );
}

export default App;
