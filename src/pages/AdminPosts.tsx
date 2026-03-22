/**
 * AdminPosts.tsx
 * 
 * Admin interface for managing blog posts.
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postService, Post, PostStatus } from '../services/postService';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle,
  FileEdit,
  Archive,
  MoreVertical
} from 'lucide-react';

export function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<PostStatus | 'all'>('all');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const filters = {
        status: filterStatus === 'all' ? undefined : filterStatus as PostStatus
      };
      const data = await postService.getPosts(filters);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filterStatus]);

  const handleDelete = async (id: string) => {
    if (window.confirm('確定要刪除這篇文章嗎？此操作不可恢復。')) {
      await postService.deletePost(id);
      fetchPosts();
    }
  };

  const handleCreateDraft = async () => {
    try {
      const res = await postService.createPost({
        title: '新文章草稿',
        status: 'draft'
      });
      navigate(`/admin/posts/${res.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('zh-TW');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">文章管理</h1>
          <p className="text-[#1A1A1A]/40 text-sm font-light">發布品牌動態、養護知識與專題文章。</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3 py-2 text-xs uppercase tracking-widest text-[#1A1A1A]/60">
            <Filter size={14} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">所有狀態</option>
              <option value="draft">草稿</option>
              <option value="published">已發布</option>
              <option value="archived">已封存</option>
            </select>
          </div>
          <button 
            onClick={handleCreateDraft}
            className="bg-[#1A1A1A] text-white px-6 py-2 text-xs tracking-widest uppercase flex items-center gap-2 hover:bg-[#5A6B58] transition-colors"
          >
            <Plus size={16} /> 新增文章
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#1A1A1A]/10 overflow-hidden">
        {loading ? (
          <div className="text-center py-20 text-[#1A1A1A]/20">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-[#1A1A1A]/20">尚無文章項目</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F7F5] border-b border-[#1A1A1A]/10 text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
              <tr>
                <th className="px-6 py-4 font-medium">標題 Title</th>
                <th className="px-6 py-4 font-medium">分類 Category</th>
                <th className="px-6 py-4 font-medium">狀態 Status</th>
                <th className="px-6 py-4 font-medium">發布日期 Published At</th>
                <th className="px-6 py-4 font-medium text-right">操作 Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/5">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-[#F7F7F5]/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {post.coverImageUrl ? (
                        <img src={post.coverImageUrl} className="w-10 h-10 object-cover border border-[#1A1A1A]/5" alt="" />
                      ) : (
                        <div className="w-10 h-10 bg-[#1A1A1A]/5 flex items-center justify-center border border-[#1A1A1A]/5">
                          <FileText size={16} className="text-[#1A1A1A]/20" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-[#1A1A1A]">{post.title || '(無標題)'}</div>
                        <div className="text-[10px] text-[#1A1A1A]/30 font-mono mt-0.5">{post.slug || 'no-slug'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#1A1A1A]/60">
                    <span className="text-xs">{post.category || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        post.status === 'published' ? 'bg-[#5A6B58]' :
                        post.status === 'draft' ? 'bg-blue-400' : 'bg-[#1A1A1A]/20'
                      }`} />
                      <span className="text-[10px] uppercase tracking-widest font-medium text-[#1A1A1A]/60">{post.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#1A1A1A]/40 font-mono text-xs">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/admin/posts/${post.id}`}
                        className="p-2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                        title="編輯"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-[#1A1A1A]/40 hover:text-red-600 transition-colors"
                        title="刪除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
