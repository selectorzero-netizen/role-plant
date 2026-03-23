/**
 * AdminPostEditor.tsx
 * 
 * Editor interface for blog posts.
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useBlocker } from 'react-router-dom';
import { 
  postService, 
  Post, 
  PostStatus 
} from '../services/postService';
import { useAuth } from '../AuthContext';
import { auditService } from '../services/auditService';
import { taxonomyService } from '../services/taxonomyService';
import { Taxonomy } from '../types';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle, 
  Eye, 
  Image as ImageIcon, 
  Tag as TagIcon,
  Layout,
  Type,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { MediaPicker } from '../components/MediaPicker';

export function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
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
  const [originalPost, setOriginalPost] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [categories, setCategories] = useState<Taxonomy[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const data = await postService.getPostById(id);
        if (data) {
          setPost(data);
          setOriginalPost(JSON.parse(JSON.stringify(data)));
        }
        setLoading(false);
      };
      fetchPost();
    } else {
      setLoading(false);
      setOriginalPost({
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: '',
        tags: [],
        status: 'draft',
        coverImageUrl: ''
      });
    }
    const fetchTaxonomy = async () => {
      try {
        const data = await taxonomyService.getByType('post_category');
        setCategories(data);
      } catch (err) {
        console.error("Post taxonomy fetch error:", err);
      }
    };
    fetchTaxonomy();
  }, [id]);

  const isDirty = JSON.stringify(post) !== JSON.stringify(originalPost);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      if (id) {
        await postService.updatePost(id, post);
        if (userProfile) {
          await auditService.log({
            userId: userProfile.uid,
            userName: userProfile.name,
            action: 'update',
            entityType: 'post',
            entityId: id,
            details: `Updated post: ${post.title}`,
            before: originalPost,
            after: post
          });
        }
      } else {
        const newDocRef = await postService.createPost(post as Omit<Post, 'id' | 'createdAt' | 'updatedAt'>);
        const newId = newDocRef.id;
        if (userProfile) {
          await auditService.log({
            userId: userProfile.uid,
            userName: userProfile.name,
            action: 'create',
            entityType: 'post',
            entityId: newId,
            details: `Created new post: ${post.title}`,
            after: post
          });
        }
        navigate(`/admin/posts/${newId}`, { replace: true });
      }
      setOriginalPost(JSON.parse(JSON.stringify(post)));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error("Error saving post:", error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (status: PostStatus) => {
    if (status === 'published' && !confirm('確定要發布此文章嗎？發布後前台將可見。')) return;
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
      {/* Navigation Blocker */}
      {blocker.state === 'blocked' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-8 border border-[#1A1A1A]/10 shadow-2xl animate-in fade-in zoom-in duration-300 text-center">
            <h3 className="text-xl font-light mb-4 flex items-center justify-center gap-2">
              <AlertTriangle className="text-amber-500" size={24} />
              未儲存的變更
            </h3>
            <p className="text-sm text-[#1A1A1A]/60 mb-8 leading-relaxed">
              文章內容尚未儲存，離開將遺失目前修改。
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => blocker.proceed?.()}
                className="flex-1 px-4 py-3 border border-red-200 text-red-700 text-xs tracking-widest hover:bg-red-50 transition-colors uppercase"
              >
                捨棄離開
              </button>
              <button
                onClick={() => blocker.reset?.()}
                className="flex-1 px-4 py-3 bg-[#1A1A1A] text-white text-xs tracking-widest hover:bg-[#5A6B58] transition-colors uppercase"
              >
                繼續編輯
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/admin/posts" className="p-2 hover:bg-[#1A1A1A]/5 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-light tracking-tight">{id ? '編輯文章' : '新增文章'}</h1>
            <div className="flex items-center gap-3">
              <p className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">
                Post Management / {post.status}
              </p>
              {isDirty && <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full animate-pulse border border-amber-200">UNSAVED CHANGES ●</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {saveStatus !== 'idle' && (
            <span className={`text-[10px] tracking-widest uppercase font-bold animate-in fade-in slide-in-from-right-2 ${saveStatus === 'saved' ? 'text-[#5A6B58]' : 'text-red-500'}`}>
              {saveStatus === 'saved' ? '文章已儲存 ✓' : '儲存失敗 ✗'}
            </span>
          )}
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
              disabled={saving || !isDirty}
              className={`bg-[#1A1A1A] text-white px-8 py-2 text-xs tracking-widest uppercase flex items-center gap-2 transition-all ${saving ? 'opacity-50' : isDirty ? 'hover:bg-[#5A6B58]' : 'opacity-30 cursor-not-allowed'}`}
            >
              {saving ? 'Saving...' : <><Save size={16} /> Save 文章</>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Slug */}
          <div className={`bg-white p-8 border transition-colors space-y-6 ${originalPost?.title !== post.title ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                <span className="flex items-center gap-2"><Type size={12} /> 文章標題 Title</span>
                {originalPost?.title !== post.title && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              <input 
                type="text" 
                value={post.title} 
                onChange={(e) => setPost(prev => ({ ...prev, title: e.target.value }))}
                onBlur={generateSlug}
                className={`w-full text-2xl font-light border-b py-3 focus:outline-none focus:border-[#1A1A1A] transition-colors ${originalPost?.title !== post.title ? 'border-amber-300' : 'border-[#1A1A1A]/10'}`}
                placeholder="請輸入標題..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                URL Slug (唯一識別碼)
                {originalPost?.slug !== post.slug && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              <input 
                type="text" 
                value={post.slug} 
                onChange={(e) => setPost(prev => ({ ...prev, slug: e.target.value }))}
                className={`w-full text-xs font-mono border p-3 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors ${originalPost?.slug !== post.slug ? 'bg-amber-50/30 border-amber-300' : 'bg-[#F7F7F5] border-[#1A1A1A]/5'}`}
                placeholder="slug-format-only"
              />
            </div>
          </div>

          {/* Content Editor */}
          <div className={`bg-white p-8 border transition-colors space-y-6 ${originalPost?.content !== post.content ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                <span className="flex items-center gap-2"><FileText size={12} /> 文章內文 Content (Markdown / Text)</span>
                {originalPost?.content !== post.content && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              <textarea 
                value={post.content} 
                onChange={(e) => setPost(prev => ({ ...prev, content: e.target.value }))}
                rows={20}
                className={`w-full font-light leading-relaxed border p-6 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors ${originalPost?.content !== post.content ? 'border-amber-300 bg-amber-50/10' : 'border-[#1A1A1A]/5 bg-[#FCFBFA]'}`}
                placeholder="開始書寫文章內容..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="lg:col-span-1 space-y-8">
          {/* Summary */}
          <div className={`bg-white p-6 border transition-colors space-y-4 ${originalPost?.summary !== post.summary ? 'border-amber-300 bg-amber-50/5' : 'border-[#1A1A1A]/5'}`}>
            <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
              文章摘要 Summary
              {originalPost?.summary !== post.summary && <span className="text-amber-600 font-bold">● MODIFIED</span>}
            </label>
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
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                <span className="flex items-center gap-2"><Layout size={12} /> 分類 Category</span>
                {originalPost?.category !== post.category && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              <select 
                value={post.category} 
                onChange={(e) => setPost(prev => ({ ...prev, category: e.target.value }))}
                className={`w-full text-sm border-b py-2 focus:outline-none focus:border-[#1A1A1A] transition-colors bg-[#F7F7F5] ${originalPost?.category !== post.category ? 'border-amber-300 bg-amber-50/10' : 'border-[#1A1A1A]/10'}`}
              >
                <option value="" disabled>請選擇分類...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.key}>{c.label}</option>
                ))}
                <option value="Uncategorized">未分類 Uncategorized</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                <span className="flex items-center gap-2"><TagIcon size={12} /> 標籤 Tags</span>
                {JSON.stringify(originalPost?.tags) !== JSON.stringify(post.tags) && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className={`w-full text-sm border-b py-2 focus:outline-none focus:border-[#1A1A1A] transition-colors ${JSON.stringify(originalPost?.tags) !== JSON.stringify(post.tags) ? 'border-amber-300 bg-amber-50/10' : 'border-[#1A1A1A]/10'}`}
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
              <label className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 flex justify-between">
                <span className="flex items-center gap-2"><ImageIcon size={12} /> 封面連結 Cover Image URL</span>
                {originalPost?.coverImageUrl !== post.coverImageUrl && <span className="text-amber-600 font-bold">● MODIFIED</span>}
              </label>
              {post.coverImageUrl && (
                <div className={`aspect-video w-full overflow-hidden border bg-[#F7F7F5] transition-colors ${originalPost?.coverImageUrl !== post.coverImageUrl ? 'border-amber-300 shadow-inner' : 'border-[#1A1A1A]/10'}`}>
                  <img src={post.coverImageUrl} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
              <input 
                type="text" 
                value={post.coverImageUrl} 
                onChange={(e) => setPost(prev => ({ ...prev, coverImageUrl: e.target.value }))}
                className={`w-full text-xs font-mono border p-3 focus:outline-none focus:border-[#1A1A1A]/20 transition-colors ${originalPost?.coverImageUrl !== post.coverImageUrl ? 'border-amber-300 bg-amber-50/10' : 'border-[#1A1A1A]/10'}`}
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
