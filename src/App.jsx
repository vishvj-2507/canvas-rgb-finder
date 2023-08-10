import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [rgbValue, setRgbValue] = useState(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = 'ballon.png';
    img.onload = () => {
      setImage(img);
    };
  }, []);

  const handleStageClick = () => {
    const stage = stageRef.current;
    const imageNode = stage.findOne('Image');
    const position = stage.getPointerPosition();

    if (imageNode && imageNode.image()) {
      const canvas = document.createElement('canvas');
      canvas.width = imageNode.width();
      canvas.height = imageNode.height();
      const context = canvas.getContext('2d');
      context.drawImage(imageNode.image(), 0, 0, imageNode.width(), imageNode.height());
      const pixelData = context.getImageData(position.x, position.y, 1, 1).data;
      const [r, g, b] = pixelData.slice(0, 3);
      let left = position.x;
      let top = position.y;
      setRgbValue({ r, g, b, left, top });
    }
  };

  return (
    <div className='main-container'>
      <Stage width={400} height={400} onClick={handleStageClick} ref={stageRef}>
        <Layer>{image && <Image image={image} width={400} height={400} />}</Layer>
      </Stage>
      {rgbValue && (
        <div
          className='popup'
          style={{
            left: rgbValue && rgbValue.left + 'px',
            top: rgbValue && rgbValue.top + 'px',
            backgroundColor: `rgb(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b})`,
          }}
        >
          rgb ({rgbValue.r}, {rgbValue.g}, {rgbValue.b})
        </div>
      )}
    </div>
  );
}

export default App;
