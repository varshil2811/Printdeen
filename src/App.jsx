import { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import CanvasArea from "./components/CanvasArea";

export default function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [elements, setElements] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const stageRef = useRef(null);

  const handleAddText = (content, fontSize, color, fontFamily = "Arial", fontStyle = "normal") => {
    console.log('Adding text with color:', color);
    setTexts([...texts, { id: Date.now(), content, fontSize, color, fontFamily, fontStyle, x: 100, y: 100 }]);
  };

  const handleAddElement = (type, color) => {
    setElements([...elements, { id: Date.now(), type, color, x: 200, y: 200, width: 100, height: 100 }]);
  };

  const handleTextEdit = (id, newContent, newColor) => {
    setTexts(texts.map(t => t.id === id ? { ...t, content: newContent, color: newColor } : t));
  };

  const handleTextColorChange = (id, newColor) => {
    setTexts(texts.map(t => t.id === id ? { ...t, color: newColor } : t));
  };

  const handleTextSizeChange = (id, newSize) => {
    setTexts(texts.map(t => t.id === id ? { ...t, fontSize: newSize } : t));
  };

  const handleElementColorChange = (id, newColor) => {
    setElements(elements.map(e => e.id === id ? { ...e, color: newColor } : e));
  };

  const handleTextFontChange = (id, newFontFamily) => {
    setTexts(texts.map(t => t.id === id ? { ...t, fontFamily: newFontFamily } : t));
  };

  const handleTextStyleChange = (id, newFontStyle) => {
    setTexts(texts.map(t => t.id === id ? { ...t, fontStyle: newFontStyle } : t));
  };

  const handleTextDelete = (id) => {
    setTexts(texts.filter(t => t.id !== id));
  };

  const handleDownload = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'design.png';
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      if (selectedItem.type === 'text') {
        setTexts(texts.filter(t => t.id !== selectedItem.id));
      } else if (selectedItem.type === 'element') {
        setElements(elements.filter(e => e.id !== selectedItem.id));
      } else if (selectedItem.type === 'image') {
        setUploadedImage(null);
      }
      setSelectedItem(null);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar
        onDelete={handleDelete}
        hasSelection={!!selectedItem}
        onDownload={handleDownload}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onImageUpload={setUploadedImage}
          onAddText={handleAddText}
          onBackgroundChange={setBackgroundColor}
          onAddElement={handleAddElement}
          selectedItem={selectedItem}
          texts={texts}
          elements={elements}
          onTextColorChange={handleTextColorChange}
          onTextSizeChange={handleTextSizeChange}
          onElementColorChange={handleElementColorChange}
          onTextFontChange={handleTextFontChange}
          onTextStyleChange={handleTextStyleChange}
        />
        <CanvasArea
          uploadedImage={uploadedImage}
          texts={texts}
          elements={elements}
          onTextEdit={handleTextEdit}
          onTextDelete={handleTextDelete}
          backgroundColor={backgroundColor}
          onSelectionChange={setSelectedItem}
          stageRef={stageRef}
        />
      </div>
    </div>
  );
}