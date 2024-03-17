import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './memeGenerator.module.css';
import classNames from 'classnames';

interface Props {
  image: HTMLImageElement | null;
  upperText: string;
  lowerText: string;
  color?: string;
  className?: string;
  setDataURL: (data: string) => void;
}

export default function MemeGenerator({image, lowerText, upperText, color = 'black', className, setDataURL}: Props) {
  const [isMounted, setMounted] = useState(false);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const resultRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawText = useCallback((canvas: HTMLCanvasElement, text: string, x: number, y: number, maxWidth: number, baseline: 'top' | 'bottom') => {
    const context = canvas.getContext('2d');
    if (!context) return;

    const fontSize = canvas.height / 16;
    const lineHeight = (canvas.height / 16) * 1.2;

    context.font = `500 ${fontSize}px Inter`;
    context.textBaseline = baseline;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.fontKerning;
  
    const words = text.split(' ');
    let line = '';
    let currentY = baseline === 'bottom' ?  y - lineHeight : y;

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
  }, [color]);

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
    drawText(canvas, upperText, canvas.width / 2, canvas.height / 20, canvas.width - 10, 'top');
    drawText(canvas, lowerText, canvas.width / 2, canvas.height - (canvas.height / 20), canvas.width - 10, 'bottom');
    setDataURL(canvas.toDataURL('image/jpeg'));
  }, [upperText, lowerText, image, drawImage, drawText]);

  function saveResult() {
    if (!resultRef.current) return;
    resultRef.current.width = 1024;
    resultRef.current.height = 1024;
    drawCanvas(resultRef.current);
  }

  useEffect(() => {
    if (!previewRef.current || !isMounted) return;
    drawCanvas(previewRef.current);
    saveResult();
  }, [image, color, upperText, lowerText]);

  useEffect(() => {
    function resize() {
      if (!containerRef.current || !previewRef.current) return;
      const size = containerRef.current.clientHeight;
      previewRef.current.width = size;
      previewRef.current.height = size;
      
      drawCanvas(previewRef.current);
      saveResult();
    }
    if (!isMounted) {
      resize();
      setMounted(true);
    }

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [drawCanvas]);

  return (
    <div ref={containerRef} className={classNames(styles.container, className)}>
      <canvas id='preview' className={styles.preview} ref={previewRef} />
      <canvas id='result' className={styles.result} ref={resultRef} />
    </div>
  );
}
