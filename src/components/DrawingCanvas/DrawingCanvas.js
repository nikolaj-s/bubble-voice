import { useRef, useState, useEffect } from 'react';
import styles from './DrawingCanvas.module.css';
import { Pencil, Eraser, Download, Upload, PaintBucket, Trash2 } from 'lucide-react';
import IconButton from '../ui/Buttons/IconButton/IconButton';
import VolumeSlider from '../ui/Inputs/VolumeSlider/VolumeSlider';
import { ToolBar } from '../ui/Wrappers/ToolBar/ToolBar';

const PREDEFINED_COLORS = ['#000000', '#ff4747', '#ffb347', '#ffe347', '#76c7a5', '#4e8e8b', '#3b7a6e'];

const DrawingCanvas = ({ onSubmit }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(PREDEFINED_COLORS[0]);
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState('brush'); // 'brush' | 'eraser' | 'fill'
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 500;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;

    return () => {
      ctxRef.current = null;
      if (canvasRef.current) {
        canvasRef.current.width = 0;
        canvasRef.current.height = 0;
      }
      canvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (ctxRef.current) ctxRef.current.lineWidth = brushSize;
  }, [brushSize]);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    }
  }, [color, tool]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    return { x, y };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getPos(e);

    if (tool === 'fill') {
      ctxRef.current.fillStyle = color;
      ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const finishDrawing = (e) => {
    e.preventDefault();
    ctxRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || tool === 'fill') return;
    const { x, y } = getPos(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      if (blob) {
        onSubmit(blob);
      }
    }, 'image/png');
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setShake(true);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setTimeout(() => setShake(false), 400);
  };

  return (
    <div className={styles.wrapper}>
      <ToolBar style={{alignItems: 'center'}}>
        
        <IconButton position='bottom' Icon={Pencil} onClick={() => setTool('brush')} backgroundColor={tool === 'brush' && 'var(--button-hover)'} title={"Brush"} />
        <IconButton position='bottom' Icon={Eraser} onClick={() => setTool('eraser')} backgroundColor={tool === 'eraser' && 'var(--button-hover)'} title="Eraser" />
        <IconButton position='bottom' Icon={PaintBucket} onClick={() => setTool('fill')} backgroundColor={tool === 'fill' && 'var(--button-hover)'} title="Fill" />
        <div className={styles.brushSize}>
          Size: {brushSize}
        </div>
        <VolumeSlider step={1} min={1} max={40} value={brushSize} onChange={setBrushSize} />
        <div className={styles.colorPalette}>
          {PREDEFINED_COLORS.map((c) => (
            <div
              key={c}
              className={`${styles.colorSwatch} ${color === c && tool !== 'eraser' ? styles.selected : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                setTool('brush');
              }}
            />
          ))}
        </div>
      </ToolBar>

      <div
        className={`${styles.canvasWrapper} ${shake ? styles.shake : ''}`}
        onMouseMove={(e) => {
          const { x, y } = getPos(e);
          setCursorPos({ x, y });
        }}
        onMouseLeave={() => setCursorPos({ x: -1000, y: -1000 })}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          onMouseLeave={finishDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={draw}
        />
        <div
          className={styles.brushCursor}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            width: brushSize,
            height: brushSize,
            borderColor: tool === 'eraser' ? '#ffffff' : color,
          }}
        />
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          <Upload size={18} />
          Send
        </button>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          <Download size={18} />
          Download
        </button>
        <button className={styles.clearBtn} onClick={handleClear}>
          <Trash2 size={18} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
