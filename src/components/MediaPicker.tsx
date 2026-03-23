/**
 * MediaPicker.tsx
 * 
 * A modal-based component to select media from the library.
 */
import React, { useState, useEffect, useRef } from 'react';
import { mediaService, Media, MediaUsage } from '../services/mediaService';
import { useAuth } from '../AuthContext';
import { auditService } from '../services/auditService';
import { Search, X, Check, Upload, FileImage } from 'lucide-react';

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  usage?: MediaUsage;
}

export function MediaPicker({ onSelect, onClose, usage = 'general' }: MediaPickerProps) {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userProfile } = useAuth();

  const fetchMedia = async () => {
    try {
      const data = await mediaService.getMediaList({ 
        usage: usage,
        isActive: true 
      });
      setMediaList(data);
    } catch (error) {
      console.error("Error fetching media in picker:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [usage]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const mediaId = await mediaService.uploadMedia(
        file, 
        { usage, alt: file.name },
        (progress) => setUploadProgress(progress)
      );

      if (userProfile) {
        await auditService.log({
          userId: userProfile.uid,
          userName: userProfile.name,
          action: 'create',
          entityType: 'media',
          entityId: mediaId,
          details: `Uploaded media from picker: ${file.name}`,
          after: { fileName: file.name, type: file.type }
        });
      }

      // Auto-select after upload finishes
      const updatedMediaList = await mediaService.getMediaList({ usage, isActive: true });
      const newMedia = updatedMediaList.find(m => m.id === mediaId);
      if (newMedia) {
        onSelect(newMedia.url);
      } else {
        await fetchMedia();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert('上傳失敗');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filteredMedia = mediaList.filter(m => 
    m.fileName.toLowerCase().includes(search.toLowerCase()) ||
    m.alt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]/10 flex justify-between items-center bg-[#F7F7F5]">
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-[#1A1A1A]">插入圖片 Media Library</h3>
            <p className="text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest mt-1">從媒體庫選擇或直接上傳新圖片</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 bg-white flex gap-4 border-b border-[#1A1A1A]/5 items-center">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-[#1A1A1A] text-white px-6 py-2 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#5A6B58] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {uploading ? `${Math.round(uploadProgress)}%` : <><Upload size={14} /> 上傳新圖</>}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/*"
          />
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30" size={14} />
            <input 
              type="text" 
              placeholder="搜尋現有圖片..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F7F7F5] border border-[#1A1A1A]/5 pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#5A6B58]"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin bg-white">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A1A] mb-4"></div>
              <p className="text-xs uppercase tracking-widest">載入中...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-30 italic">
              <FileImage size={40} className="mb-4 text-[#1A1A1A]/20" />
              <p className="text-xs uppercase tracking-widest">沒有找到圖片</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredMedia.map(media => (
                <button 
                  key={media.id}
                  onClick={() => onSelect(media.url)}
                  className="group relative aspect-square border border-[#1A1A1A]/5 overflow-hidden hover:border-[#5A6B58] transition-all bg-[#F7F7F5]"
                >
                  <img 
                    src={media.url} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={media.alt} 
                  />
                  <div className="absolute inset-0 bg-[#5A6B58]/0 group-hover:bg-[#5A6B58]/10 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 text-[#5A6B58] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-sm">
                      <Check size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
