/**
 * PostPages.tsx
 * 
 * Public pages for blog posts.
 */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { postService, Post } from '../services/postService';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getPosts({ status: 'published' });
        setPosts(data);
      } catch (error) {
        console.error("Error fetching published posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#1A1A1A]/5 w-1/4 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-[#1A1A1A]/5"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-24">
        <h1 className="text-4xl font-light tracking-tight mb-4">品牌專欄</h1>
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/40">Journal & Perspectives</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-32 border border-dashed border-[#1A1A1A]/10">
          <p className="text-[#1A1A1A]/30 italic font-light">目前尚無發布文章</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.slug}`} className="group space-y-6 block">
              <div className="aspect-[4/5] overflow-hidden bg-[#F7F7F5] border border-[#1A1A1A]/5">
                {post.coverImageUrl ? (
                  <img 
                    src={post.coverImageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/20 italic">No Cover</span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
                  <span>{post.category || 'General'}</span>
                  <span>/</span>
                  <span>{post.publishedAt ? new Date(post.publishedAt.toDate ? post.publishedAt.toDate() : post.publishedAt).toLocaleDateString() : 'Draft'}</span>
                </div>
                <h2 className="text-xl font-medium tracking-tight group-hover:text-[#5A6B58] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm font-light text-[#1A1A1A]/60 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        const data = await postService.getPostBySlug(slug);
        setPost(data);
        setLoading(false);
      };
      fetchPost();
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-40 px-6 text-center text-[#1A1A1A]/20 uppercase tracking-widest text-xs">Loading Content...</div>;

  if (!post) {
    return (
      <div className="min-h-screen pt-40 px-6 text-center space-y-6">
        <h1 className="text-2xl font-light">找不到該文章</h1>
        <p className="text-sm text-[#1A1A1A]/40">此文章可能已下架或網址不正確。</p>
        <Link to="/posts" className="inline-block text-xs uppercase tracking-widest border-b border-[#1A1A1A]/20 pb-1 mt-4">返回文章列表</Link>
      </div>
    );
  }

  const publishDate = post.publishedAt ? new Date(post.publishedAt.toDate ? post.publishedAt.toDate() : post.publishedAt).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '-';

  return (
    <div className="bg-[#FCFBFA] min-h-screen pb-32">
      {/* Article Header */}
      <header className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
        <Link to="/posts" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/40 mb-12 hover:text-[#1A1A1A] transition-colors group w-fit">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
        </Link>
        <div className="space-y-6 border-b border-[#1A1A1A]/5 pb-16">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#5A6B58] font-medium">
            <span>{post.category}</span>
            <span className="text-[#1A1A1A]/10">/</span>
            <span className="text-[#1A1A1A]/40 font-light">{publishDate}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.2] text-[#1A1A1A]">
            {post.title}
          </h1>
          <p className="text-[#1A1A1A]/60 font-medium text-lg italic leading-relaxed">
            {post.summary}
          </p>
        </div>
      </header>

      {/* Featured Image */}
      {post.coverImageUrl && (
        <div className="max-w-6xl mx-auto px-6 mb-24">
          <div className="aspect-[21/9] overflow-hidden bg-[#F7F7F5] border border-[#1A1A1A]/5">
            <img src={post.coverImageUrl} className="w-full h-full object-cover" alt={post.title} />
          </div>
        </div>
      )}

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="prose prose-stone prose-neutral max-w-none">
          {/* Using dangerouslySetInnerHTML for simplicity in MVP, but we'll manually render paragraphs for better styling if it's just raw text */}
          <div className="space-y-10 text-[#1A1A1A]/80 font-light leading-relaxed text-lg whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

        {/* Footer Meta */}
        <footer className="mt-24 pt-12 border-t border-[#1A1A1A]/5">
          <div className="flex flex-wrap gap-3">
            {post.tags?.map((tag, i) => (
              <span key={i} className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 bg-[#1A1A1A]/5 px-4 py-1.5 rounded-full">
                # {tag}
              </span>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
