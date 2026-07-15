import { useEffect, useRef, useState } from 'react';

export default function StrudelRepl({ code, onFileUpload }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCode, setCurrentCode] = useState(code || `// Default Strudel pattern
note("c3 e3 g3 c4")
  .s("piano")
  .lpf(2000)`);

  // Load the Strudel embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@strudel/embed@latest';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Create the Strudel editor element
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    // Clear previous editor
    if (editorRef.current) {
      containerRef.current.removeChild(editorRef.current);
    }

    // Create new editor
    const editor = document.createElement('strudel-repl');
    editor.setAttribute('code', currentCode);
    containerRef.current.appendChild(editor);
    editorRef.current = editor;
  }, [isLoading, currentCode]);

  // Handle file upload
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    setCurrentCode(text);
    
    if (onFileUpload) {
      onFileUpload(text);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🎵</span>
              Strudel REPL
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Live coding music environment - Start typing patterns to create music!
            </p>
          </div>
          
          {/* File upload button */}
          <div>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <span>📁</span>
              <span>Load File</span>
              <input
                type="file"
                accept=".js,.txt,.tidal"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Strudel REPL...</p>
          </div>
        </div>
      )}

      {/* Strudel REPL container */}
      {!isLoading && (
        <div ref={containerRef} className="flex-1 relative" />
      )}

      {/* Footer with quick tips */}
      <div className="bg-gray-800 p-3 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
          <span>💡 Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Ctrl+Enter</kbd> to play</span>
          <span>⏸️ Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Ctrl+.</kbd> to stop</span>
          <span>📖 <a href="https://strudel.cc/learn/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Learn Strudel</a></span>
        </div>
      </div>
    </div>
  );
}
