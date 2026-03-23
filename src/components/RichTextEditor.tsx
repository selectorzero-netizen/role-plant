import React, { useRef, useState } from 'react';
import { Bold, Heading2, List, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { MediaPicker } from './MediaPicker';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function RichTextEditor({ value, onChange, placeholder, rows = 15 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const insertText = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = `${beforeText}${prefix}${selectedText || (suffix ? '文字' : '')}${suffix}${afterText}`;
    onChange(newText);

    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length;
      const selectionLen = selectedText ? selectedText.length : (suffix ? 2 : 0);
      textarea.setSelectionRange(newCursorPos, newCursorPos + selectionLen);
    }, 0);
  };

  const handleImageSelect = (url: string) => {
    insertText(`\n![圖說](${url})\n`, '');
    setShowPicker(false);
  };

  return (
    <div className="border border-[#1A1A1A]/10 bg-white flex flex-col focus-within:border-[#1A1A1A]/30 transition-colors">
      <div className="flex items-center gap-1 border-b border-[#1A1A1A]/5 p-2 bg-[#F7F7F5]">
        <button 
          title="標題 (H2)"
          onClick={() => insertText('\n## ', ' ')}
          className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
        >
          <Heading2 size={16} />
        </button>
        <button 
          title="粗體 (Bold)"
          onClick={() => insertText('**', '**')}
          className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
        >
          <Bold size={16} />
        </button>
        <div className="w-px h-4 bg-[#1A1A1A]/10 mx-1"></div>
        <button 
          title="清單 (List)"
          onClick={() => insertText('\n- ', ' ')}
          className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
        >
          <List size={16} />
        </button>
        <div className="w-px h-4 bg-[#1A1A1A]/10 mx-1"></div>
        <button 
          title="連結 (Link)"
          onClick={() => insertText('[', '](https://)')}
          className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
        >
          <LinkIcon size={16} />
        </button>
        <button 
          title="插入圖片 (Image)"
          onClick={() => setShowPicker(true)}
          className="p-1.5 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 rounded transition-colors"
        >
          <ImageIcon size={16} />
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full p-4 focus:outline-none resize-y font-light leading-relaxed text-[#1A1A1A] bg-transparent"
      />

      {showPicker && (
        <MediaPicker 
          usage="content"
          onSelect={handleImageSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
