/**
 * AdminMedia.tsx
 * 
 * Admin interface for managing media assets.
 */
import React, { useState, useEffect, useRef } from 'react';
import { mediaService, Media, MediaUsage } from '../services/mediaService';
import { 
  Plus, 
  Search, 
  Filter, 
  Copy, 
  Trash2, 
  CheckCircle,
  XCircle,
  FileImage,
  Upload,
  MoreVertical,
  X
} from 'lucide-react';

export function AdminMedia() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterUsage, setFilterUsage] = useState<MediaUsage | 'all'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const filters = {
        usage: filterUsage === 'all' ? undefined : filterUsage as MediaUsage
      };
      const data = await mediaService.getMediaList(filters);
      setMediaList(data);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [filterUsage]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      await mediaService.uploadMedia(
        file, 
        { usage: 'general', alt: file.name },
        (progress) => setUploadProgress(progress)
      );
      fetchMedia();
    } catch (error) {
      console.error("Upload failed:", error);
      alert('上傳失敗');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL 已複製');
  };

  const handleToggleActive = async (media: Media) => {
    await mediaService.toggleMediaActive(media.id, !media.isActive);
    fetchMedia();
    if (selectedMedia?.id === media.id) {
      setSelectedMedia(prev => prev ? { ...prev, isActive: !prev.isActive } : null);
    }
  };

  const handleDelete = async (media: Media) => {
    if (window.confirm('確定要永久刪除此媒體資料嗎？（Storage 中的檔案也會被刪除，可能導致引用此圖的頁面失效）')) {
      await mediaService.deleteMedia(media.id, media.storagePath);
      fetchMedia();
      setSelectedMedia(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">媒體管理</h1>
          <p className="text-[#1A1A1A]/40 text-sm font-light">管理與上傳植物、文章、內容頁所需之媒體資產。</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3 py-2 text-xs uppercase tracking-widest text-[#1A1A1A]/60">
            <Filter size={14} />
            <select 
              value={filterUsage} 
              onChange={(e) => setFilterUsage(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">所有類別</option>
              <option value="plant">植物</option>
              <option value="post">貼文</option>
              <option value="content">內容</option>
              <option value="general">一般</option>
            </select>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-[#1A1A1A] text-white px-6 py-2 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#5A6B58] transition-colors disabled:opacity-50"
          >
            {uploading ? `${Math.round(uploadProgress)}%` : <><Upload size={16} /> 上傳媒體</>}
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-20 text-[#1A1A1A]/20">Loading...</div>
        ) : mediaList.length === 0 ? (
          <div className="col-span-full text-center py-20 text-[#1A1A1A]/20 border border-dashed border-[#1A1A1A]/10">尚無媒體資產</div>
        ) : (
          mediaList.map(media => (
            <button 
              key={media.id}
              onClick={() => setSelectedMedia(media)}
              className={`group relative aspect-square border overflow-hidden transition-all ${
                selectedMedia?.id === media.id 
                  ? 'border-[#5A6B58] ring-2 ring-[#5A6B58]/20' 
                  : 'border-[#1A1A1A]/5 hover:border-[#1A1A1A]/20'
              } ${!media.isActive ? 'opacity-40' : ''}`}
            >
              <img 
                src={media.url} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                alt={media.alt} 
              />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); copyUrl(media.url); }}
                  className="p-1.5 bg-white/90 text-[#1A1A1A] rounded shadow-sm hover:bg-white"
                  title="複製連結"
                >
                  <Copy size={12} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-white truncate font-light tracking-widest uppercase">{media.fileName}</p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Detail Overlay / Sidebar (Simple approach for MVP) */}
      {selectedMedia && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 p-8 border-l border-[#1A1A1A]/5 transform transition-transform animate-slide-in">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-medium font-mono">Media Details</h3>
            <button onClick={() => setSelectedMedia(null)} className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
              <X size={20} />
            </button>
          </div>

          <div className="aspect-square bg-[#F7F7F5] border border-[#1A1A1A]/5 mb-8 overflow-hidden">
            <img src={selectedMedia.url} className="w-full h-full object-contain" alt="" />
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/30 block mb-1">File Name</label>
              <p className="text-sm font-medium text-[#1A1A1A] truncate">{selectedMedia.fileName}</p>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/30 block mb-1">Usage / Category</label>
              <p className="text-xs text-[#1A1A1A]/60 uppercase tracking-widest">{selectedMedia.usage}</p>
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-widest text-[#1A1A1A]/30 block mb-1">Direct URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={selectedMedia.url} 
                  className="flex-1 text-[10px] font-mono bg-[#F7F7F5] border border-[#1A1A1A]/5 p-2 truncate focus:outline-none"
                />
                <button 
                  onClick={() => copyUrl(selectedMedia.url)}
                  className="p-2 bg-[#1A1A1A] text-white hover:bg-[#5A6B58] transition-colors"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
            <div className="pt-8 border-t border-[#1A1A1A]/5 flex flex-col gap-3">
              <button 
                onClick={() => handleToggleActive(selectedMedia)}
                className={`w-full py-3 text-[10px] uppercase tracking-widest border transition-colors flex items-center justify-center gap-2 ${
                  selectedMedia.isActive 
                    ? 'border-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:bg-[#1A1A1A]/5' 
                    : 'border-[#5A6B58] text-[#5A6B58] bg-[#5A6B58]/5 hover:bg-[#5A6B58]/10'
                }`}
              >
                {selectedMedia.isActive ? <><XCircle size={14} /> 停用此媒體</> : <><CheckCircle size={14} /> 重新啟用</>}
              </button>
              <button 
                onClick={() => handleDelete(selectedMedia)}
                className="w-full py-3 text-[10px] uppercase tracking-widest text-red-600 border border-red-600/10 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> 永久刪除 Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
