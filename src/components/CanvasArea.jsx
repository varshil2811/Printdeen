import { Stage, Layer, Rect, Text, Image, Circle, Line, Star, RegularPolygon, Transformer } from "react-konva";
import { useState, useEffect, useRef } from "react";
import useImage from "use-image";

function CanvasImage({ src, isSelected, onSelect, imageRef }) {
  const [image] = useImage(src);

  if (!image) return null;

  const canvasWidth = 1200;
  const canvasHeight = 800;
  const imgWidth = image.width;
  const imgHeight = image.height;

  const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight, 1);
  const width = imgWidth * scale;
  const height = imgHeight * scale;
  const x = (canvasWidth - width) / 2;
  const y = (canvasHeight - height) / 2;

  return (
    <Image
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      ref={isSelected ? imageRef : null}
    />
  );
}

export default function CanvasArea({ uploadedImage, texts, elements, onTextEdit, onTextDelete, backgroundColor, onSelectionChange, stageRef }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editColor, setEditColor] = useState("#000000");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const inputRef = useRef(null);
  const shapeRef = useRef(null);
  const transformerRef = useRef(null);
  const textRef = useRef(null);
  const textTransformerRef = useRef(null);
  const imageRef = useRef(null);
  const imageTransformerRef = useRef(null);
  const layerRef = useRef(null);

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / 1200;
        const scaleY = clientHeight / 800;
        const newScale = Math.min(scaleX, scaleY) * 0.95;
        setScale(newScale < 1 ? newScale : 1);
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!uploadedImage) setSelectedImageId(null);
  }, [uploadedImage]);

  useEffect(() => {
    if (selectedShapeId && !elements.some((e) => e.id === selectedShapeId)) {
      setSelectedShapeId(null);
    }
  }, [elements, selectedShapeId]);

  useEffect(() => {
    if (selectedId && !texts.some((t) => t.id === selectedId)) {
      setSelectedId(null);
    }
  }, [texts, selectedId]);

  useEffect(() => {
    if (selectedImageId && imageTransformerRef.current && imageRef.current) {
      imageTransformerRef.current.nodes([imageRef.current]);
      imageTransformerRef.current.getLayer().batchDraw();
      onSelectionChange({ type: 'image', id: 'uploaded' });
    } else if (!selectedImageId && !selectedShapeId && !selectedId) {
      onSelectionChange(null);
    }
  }, [selectedImageId, selectedShapeId, selectedId, onSelectionChange]);

  useEffect(() => {
    if (selectedShapeId && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
      onSelectionChange({ type: 'element', id: selectedShapeId });
    }
  }, [selectedShapeId, onSelectionChange]);

  useEffect(() => {
    if (selectedId && textTransformerRef.current && textRef.current && !editingId) {
      textTransformerRef.current.nodes([textRef.current]);
      textTransformerRef.current.getLayer().batchDraw();
      onSelectionChange({ type: 'text', id: selectedId });
    }
  }, [selectedId, editingId, onSelectionChange]);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete") {
        if (selectedId && !editingId) {
          onTextDelete(selectedId);
          setSelectedId(null);
        } else if (selectedShapeId) {
          onSelectionChange({ type: 'element', id: selectedShapeId });
          setSelectedShapeId(null);
        } else if (selectedImageId) {
          onSelectionChange({ type: 'image', id: 'uploaded' });
          setSelectedImageId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, selectedShapeId, selectedImageId, editingId, onTextDelete, onSelectionChange]);

  const handleDoubleClick = (text) => {
    setEditingId(text.id);
    setEditValue(text.content);
    setEditColor(text.color || "#000000");
  };

  const handleBlur = () => {
    if (editingId) {
      if (editValue.trim() !== "") {
        onTextEdit(editingId, editValue, editColor);
      }
      setEditingId(null);
    }
  };

  return (
    <div ref={containerRef} className="flex-1 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden flex items-center justify-center p-2 relative">
      <div className="bg-white shadow-2xl relative flex-shrink-0" style={{ width: 1200 * scale, height: 800 * scale }}>
        <Stage width={1200 * scale} height={800 * scale} scaleX={scale} scaleY={scale} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={1200}
              height={800}
              fill={backgroundColor || "#ffffff"}
            />

            {uploadedImage && (
              <CanvasImage
                src={uploadedImage}
                isSelected={selectedImageId === 'uploaded'}
                onSelect={() => setSelectedImageId('uploaded')}
                imageRef={imageRef}
              />
            )}

            {selectedImageId && <Transformer ref={imageTransformerRef} />}
          </Layer>

          <Layer ref={layerRef}>
            {elements && elements.map((el) => {
              const isSelected = selectedShapeId === el.id;
              const shapeProps = {
                onClick: () => {
                  setSelectedShapeId(el.id);
                  if (shapeRef.current) {
                    shapeRef.current.moveToTop();
                  }
                },
                onTap: () => {
                  setSelectedShapeId(el.id);
                  if (shapeRef.current) {
                    shapeRef.current.moveToTop();
                  }
                },
                draggable: true,
                ref: isSelected ? shapeRef : null,
                onDragEnd: (e) => {
                  el.x = e.target.x();
                  el.y = e.target.y();
                },
              };

              if (el.type === 'circle') {
                return <Circle key={el.id} x={el.x} y={el.y} radius={50} fill={el.color} {...shapeProps} />;
              } else if (el.type === 'rect') {
                return <Rect key={el.id} x={el.x} y={el.y} width={el.width} height={el.height} fill={el.color} {...shapeProps} />;
              } else if (el.type === 'triangle') {
                return <RegularPolygon key={el.id} x={el.x} y={el.y} sides={3} radius={50} fill={el.color} {...shapeProps} />;
              } else if (el.type === 'star') {
                return <Star key={el.id} x={el.x} y={el.y} numPoints={5} innerRadius={20} outerRadius={40} fill={el.color} {...shapeProps} />;
              } else if (el.type === 'arrow' || el.type === 'line') {
                return <Line key={el.id} points={[el.x, el.y, el.x + 100, el.y]} stroke={el.color} strokeWidth={5} {...shapeProps} />;
              }
              return null;
            })}

            {texts.map((text) => {
              console.log('Rendering text:', text);
              const isTextSelected = selectedId === text.id;
              return (
                <Text
                  key={text.id}
                  text={text.content}
                  x={text.x}
                  y={text.y}
                  fontSize={text.fontSize}
                  fontStyle={text.fontStyle || 'normal'}
                  fontFamily={text.fontFamily || 'Arial'}
                  fill={text.color || "#000000"}
                  draggable
                  onDragEnd={(e) => {
                    text.x = e.target.x();
                    text.y = e.target.y();
                  }}
                  onDblClick={() => handleDoubleClick(text)}
                  onClick={() => {
                    setSelectedId(text.id);
                    if (textRef.current) {
                      textRef.current.moveToTop();
                    }
                  }}
                  visible={editingId !== text.id}
                  ref={isTextSelected ? textRef : null}
                />
              )
            })}

            {!uploadedImage && texts.length === 0 && elements.length === 0 && (
              <Text
                text="✨ Your Design Canvas"
                x={450}
                y={380}
                fontSize={32}
                fill="#7c3aed"
                fontStyle="bold"
              />
            )}

            {selectedShapeId && <Transformer ref={transformerRef} />}
            {selectedId && !editingId && <Transformer ref={textTransformerRef} />}
          </Layer>
        </Stage>

        {editingId && (
          <div style={{
            position: "absolute",
            left: (texts.find(t => t.id === editingId)?.x || 0) * scale,
            top: (texts.find(t => t.id === editingId)?.y || 0) * scale,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
            borderRadius: '0.375rem',
            padding: '4px',
            border: '1px solid #e2e8f0',
          }}>
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === "Enter" && handleBlur()}
              style={{
                fontSize: texts.find(t => t.id === editingId)?.fontSize || 16,
                fontFamily: texts.find(t => t.id === editingId)?.fontFamily || 'Arial',
                fontStyle: texts.find(t => t.id === editingId)?.fontStyle?.includes('italic') ? 'italic' : 'normal',
                fontWeight: texts.find(t => t.id === editingId)?.fontStyle?.includes('bold') ? 'bold' : 'normal',
                border: "2px solid #7c3aed",
                outline: "none",
                padding: "2px",
                color: editColor,
              }}
            />
            <input
              type="color"
              value={editColor}
              onChange={(e) => setEditColor(e.target.value)}
              style={{
                marginLeft: "5px",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}