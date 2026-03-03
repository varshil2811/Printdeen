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

  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const saveHistory = () => {
    setPast(prev => [...prev, { uploadedImage, texts, backgroundColor, elements }]);
    setFuture([]);
  };

  const handleUndo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setFuture(prev => [{ uploadedImage, texts, backgroundColor, elements }, ...prev]);
    setPast(newPast);

    setUploadedImage(previous.uploadedImage);
    setTexts(previous.texts);
    setBackgroundColor(previous.backgroundColor);
    setElements(previous.elements);
    setSelectedItem(null);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);

    setPast(prev => [...prev, { uploadedImage, texts, backgroundColor, elements }]);
    setFuture(newFuture);

    setUploadedImage(next.uploadedImage);
    setTexts(next.texts);
    setBackgroundColor(next.backgroundColor);
    setElements(next.elements);
    setSelectedItem(null);
  };

  const handleAddText = (content, fontSize, color, fontFamily = "Arial", fontStyle = "normal") => {
    saveHistory();
    console.log('Adding text with color:', color);
    setTexts([...texts, { id: Date.now(), content, fontSize, color, fontFamily, fontStyle, x: 100, y: 100 }]);
    setIsSidebarOpen(false); // Close sidebar after adding
  };

  const handleAddElement = (type, color) => {
    saveHistory();
    setElements([...elements, { id: Date.now(), type, color, x: 200, y: 200, width: 100, height: 100 }]);
    setIsSidebarOpen(false); // Close sidebar after adding
  };

  const handleTextEdit = (id, newContent, newColor) => {
    saveHistory();
    setTexts(texts.map(t => t.id === id ? { ...t, content: newContent, color: newColor } : t));
  };

  const handleTextColorChange = (id, newColor) => {
    saveHistory();
    setTexts(texts.map(t => t.id === id ? { ...t, color: newColor } : t));
  };

  const handleTextSizeChange = (id, newSize) => {
    saveHistory();
    setTexts(texts.map(t => t.id === id ? { ...t, fontSize: newSize } : t));
  };

  const handleElementColorChange = (id, newColor) => {
    saveHistory();
    setElements(elements.map(e => e.id === id ? { ...e, color: newColor } : e));
  };

  const handleTextFontChange = (id, newFontFamily) => {
    saveHistory();
    setTexts(texts.map(t => t.id === id ? { ...t, fontFamily: newFontFamily } : t));
  };

  const handleTextStyleChange = (id, newFontStyle) => {
    saveHistory();
    setTexts(texts.map(t => t.id === id ? { ...t, fontStyle: newFontStyle } : t));
  };

  const handleTextDelete = (id) => {
    saveHistory();
    setTexts(texts.filter(t => t.id !== id));
  };

  const handleDownload = () => {
    if (stageRef.current) {
      const stage = stageRef.current;
      // Get current scale to calculate correct pixel ratio for 1200x800 export
      const currentScale = stage.scaleX() || 1;
      const uri = stage.toDataURL({ pixelRatio: 1 / currentScale });
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
      saveHistory();
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
    <div className="h-screen flex flex-col relative overflow-hidden">
      <TopBar
        onDelete={handleDelete}
        hasSelection={!!selectedItem}
        onDownload={handleDownload}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="md:hidden absolute inset-0 bg-black/50 z-20"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className={`
          absolute md:relative z-30 h-full transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar
            onImageUpload={(img) => { saveHistory(); setUploadedImage(img); setIsSidebarOpen(false); }}
            onAddText={handleAddText}
            onBackgroundChange={(color) => { saveHistory(); setBackgroundColor(color); }}
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
        </div>

        <CanvasArea
          uploadedImage={uploadedImage}
          texts={texts}
          elements={elements}
          onTextEdit={handleTextEdit}
          onTextDelete={handleTextDelete}
          backgroundColor={backgroundColor}
          onSelectionChange={setSelectedItem}
          stageRef={stageRef}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}