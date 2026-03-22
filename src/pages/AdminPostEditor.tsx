/**
 * AdminPostEditor.tsx
 * 
 * Editor interface for blog posts.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postService, Post, PostStatus } from '../services/postService';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle, 
  Eye, 
  Image as ImageIcon, 
  Tag as TagIcon,
  Layout,
  Type,
  FileText
} from 'lucide-react';
import { MediaPicker } from '../components/MediaPicker';

export function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: '',
    tags: [],
    status: 'draft',
    coverImageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const data = await postService.getPostById(id);
        if (data) setPost(data);
        setLoading(false);
      };
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await postService.updatePost(id, post);
      alert('文章已儲存');
    } catch (error) {
      console.error("Error saving post:", error);
      alert('儲存失敗');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (status: PostStatus) => {
    setPost(prev => ({ ...prev, status }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!post.tags?.includes(tagInput.trim())) {
        setPost(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput.trim()] }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tagToRemove) }));
  };

  const generateSlug = () => {
    if (!post.title) return;
    const slug = post.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setPost(prev => ({ ...prev, slug }));
  };

  if (loading) return <div className="text-center py-20 text-[#1A1A1A]/20 uppercase tracking-widest text-xs">Loading Editor...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/posts" className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-light tracking-tight">{id ? '編輯文章' : '新增文章'}</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">
              Post Management / {post.status}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <select 
            value={post.status} 
            onChange={(e) => handleStatusChange(e.target.value as PostStatus)}
            className="bg-white border border-[#1A1A1A]/10 px-4 py-2 text-xs uppercase tracking-widest text-[#1A1A1A]/60 focus:outline-none cursor-pointer"
          >
            <option value="draft">Draft 草稿</option>
            <option value="published">Published 已發布</option>
            <option value="archived">Archived 已封存</option>
          </select>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`bg-[#1A1A1A] text-white px-8 py-2 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#5A6B58] transition-all ${saving ? 'opacity-50' : ''}`}
          >
            {saving ? 'Saving...' : <><Save size={16} /> Save 文章</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Slug */}
          <div className="bg-white p-8 border border-[#1A1A1A]/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-2">
                <Type size={12} /> 文章標題 Title
              </label>
              <input 
                type="text" 
                value={post.title} 
                onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                onBlur={generateSlug}
                className="w-full text-2xl font-light border-b border-[#1A1A1A]/10 py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                placeholder="請輸入標題..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">URL Slug (唯一識別碼)</label>
              <input 
                type="text" 
                value={post.slug} 
                onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full text-xs font-mono bg-[#F7F7F5] border border-[#1A1A1A]/5 p-3 focus:outline-none focus:border-[#1A1A1A]/20"
                placeholder="slug-format-only"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white p-8 border border-[#1A1A1A]/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-2">
                <FileText size={12} /> 文章內文 Content (Markdown / Text)
              </label>
              <textarea 
                value={post.content} 
                onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                rows={20}
                className="w-full font-light leading-relaxed border border-[#1A1A1A]/5 p-6 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors bg-[#FCFBFA]"
                placeholder="開始書寫文章內容..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="lg:col-span-1 space-y-8">
          {/* Summary */}
          <div className="bg-white p-6 border border-[#1A1A1A]/5 space-y-4">
            <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">文章摘要 Summary</label>
            <textarea 
              value={post.summary} 
              onChange={(e) => setPost(prev => ({ ...prev, summary: e.target.value }))}
              rows={4}
              className="w-full text-sm font-light leading-relaxed border border-[#1A1A1A]/5 p-4 focus:outline-none focus:border-[#1A1A1A]/20 bg-[#FCFBFA] resize-none"
              placeholder="顯示在列表頁的短文摘要..."
            ></textarea>
          </div>

          {/* Settings */}
          <div className="bg-white p-6 border border-[#1A1A1A]/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-2">
                <Layout size={12} /> 分類 Category
              </label>
              <input 
                type="text" 
                value={post.category} 
                onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                className="w-full text-sm border-b border-[#1A1A1A]/10 py-2 focus:outline-none focus:border-[#1A1A1A]"
                placeholder="例如：養護知識、品牌動態..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-2">
                <TagIcon size={12} /> 標籤 Tags
              </label>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="w-full text-sm border-b border-[#1A1A1A]/10 py-2 focus:outline-none focus:border-[#1A1A1A]"
                placeholder="輸入後按 Enter 新增..."
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags?.map((tag, idx) => (
                  <span key={idx} className="bg-[#1A1A1A]/5 text-[#1A1A1A]/60 px-3 py-1 rounded-full text-[10px] flex items-center gap-2 group">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#1A1A1A]/5">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex items-center gap-2">
                <ImageIcon size={12} /> 封面連結 Cover Image URL
              </label>
              {post.coverImageUrl && (
                <div className="aspect-video w-full overflow-hidden border border-[#1A1A1A]/10 bg-[#F7F7F5]">
                  <img src={post.coverImageUrl} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
              <input 
                type="text" 
                value={post.coverImageUrl} 
                onChange={(e) => setPost(prev => ({ ...prev, coverImageUrl: e.target.value }))}
                className="w-full text-xs font-mono border border-[#1A1A1A]/10 p-3 focus:outline-none focus:border-[#1A1A1A]/20"
                placeholder="https://images.unsplash.com/..."
              />
              <button 
                onClick={() => setShowMediaPicker(true)}
                className="w-full py-2 bg-[#5A6B58] text-white text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon size={14} /> 從媒體庫選取 Select
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMediaPicker && (
        <MediaPicker 
          usage="post" 
          onSelect={(url) => { setPost(prev => ({ ...prev, coverImageUrl: url })); setShowMediaPicker(false); }} 
          onClose={() => setShowMediaPicker(false)} 
        />
      )}
    </div>
  );
}
