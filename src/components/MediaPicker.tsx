/**
 * MediaPicker.tsx
 * 
 * A modal-based component to select media from the library.
 */
import React, { useState, useEffect } from 'react';
import { mediaService, Media, MediaUsage } from '../services/mediaService';
import { Search, X, ImageIcon, Check } from 'lucide-react';

interface MediaPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  usage?: MediaUsage;
}

export function MediaPicker({ onSelect, onClose, usage }: MediaPickerProps) {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
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
    fetchMedia();
  }, [usage]);

  const filteredMedia = mediaList.filter(m => 
    m.fileName.toLowerCase().includes(search.toLowerCase()) ||
    m.alt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A]/10 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium tracking-widest uppercase text-[#1A1A1A]">Media Library</h3>
            <p className="text-[10px] text-[#1A1A1A]/40 uppercase tracking-widest mt-1">Select an asset to use in your content</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 bg-[#F7F7F5] border-b border-[#1A1A1A]/5 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30" size={14} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#1A1A1A]/10 pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#5A6B58]"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A1A1A] mb-4"></div>
              <p className="text-xs uppercase tracking-widest">Loading Library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-20 italic">
              <ImageIcon size={40} className="mb-4" />
              <p className="text-xs uppercase tracking-widest">No assets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredMedia.map(media => (
                <button 
                  key={media.id}
                  onClick={() => onSelect(media.url)}
                  className="group relative aspect-square border border-[#1A1A1A]/5 overflow-hidden hover:border-[#5A6B58] transition-all"
                >
                  <img 
                    src={media.url} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={media.alt} 
                  />
                  <div className="absolute inset-0 bg-[#5A6B58]/0 group-hover:bg-[#5A6B58]/10 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 text-[#5A6B58] p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <Check size={16} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1A1A1A]/10 bg-[#F7F7F5] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-xs tracking-widest uppercase text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
