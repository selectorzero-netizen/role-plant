/**
 * AdminInquiries.tsx
 * 
 * Admin interface for managing inquiries.
 */
import React, { useState, useEffect } from 'react';
import { 
  inquiryService, 
  Inquiry, 
  InquiryStatus, 
  InquiryType 
} from '../services/inquiryService';
import { 
  Mail, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Eye, 
  EyeOff,
  Filter,
  ChevronDown,
  Building
} from 'lucide-react';

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<InquiryType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<InquiryStatus | 'all'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const filters = {
        type: filterType === 'all' ? undefined : filterType as InquiryType,
        status: filterStatus === 'all' ? undefined : filterStatus as InquiryStatus,
      };
      const data = await inquiryService.getInquiries(filters);
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterType, filterStatus]);

  const handleUpdateStatus = async (id: string, status: InquiryStatus) => {
    await inquiryService.updateInquiryStatus(id, status);
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    }
  };

  const handleToggleRead = async (id: string, isRead: boolean) => {
    await inquiryService.toggleReadStatus(id, isRead);
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(prev => prev ? { ...prev, isRead } : null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '-';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('zh-TW', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light tracking-tight mb-2">詢問管理</h1>
          <p className="text-[#1A1A1A]/40 text-sm font-light">管理來自前台的一般聯絡與商業洽詢。</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3 py-2 text-xs uppercase tracking-widest text-[#1A1A1A]/60">
            <Filter size={14} />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">所有類型</option>
              <option value="general">一般聯絡</option>
              <option value="business">商業洽詢</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#1A1A1A]/10 px-3 py-2 text-xs uppercase tracking-widest text-[#1A1A1A]/60">
            <Filter size={14} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="all">所有狀態</option>
              <option value="new">新進 (New)</option>
              <option value="in_progress">處理中</option>
              <option value="closed">已結案</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Column */}
        <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="text-center py-20 text-[#1A1A1A]/20">Loading...</div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-20 text-[#1A1A1A]/20 border border-dashed border-[#1A1A1A]/10">無相關詢問紀錄</div>
          ) : (
            inquiries.map(inquiry => (
              <button 
                key={inquiry.id}
                onClick={() => {
                  setSelectedInquiry(inquiry);
                  if (!inquiry.isRead) handleToggleRead(inquiry.id, true);
                }}
                className={`w-full text-left p-6 border transition-all relative ${
                  selectedInquiry?.id === inquiry.id 
                    ? 'bg-white border-[#5A6B58] shadow-sm' 
                    : 'bg-white border-[#1A1A1A]/5 hover:border-[#1A1A1A]/20'
                } ${!inquiry.isRead ? 'border-l-4 border-l-[#5A6B58]' : ''}`}
              >
                {!inquiry.isRead && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-[#5A6B58] rounded-full" />
                )}
                <div className="flex items-center gap-2 mb-3">
                  {inquiry.type === 'business' ? (
                    <span className="text-[9px] bg-[#1A1A1A] text-white px-2 py-0.5 tracking-widest uppercase">Business</span>
                  ) : (
                    <span className="text-[9px] border border-[#1A1A1A]/20 text-[#1A1A1A]/60 px-2 py-0.5 tracking-widest uppercase">General</span>
                  )}
                  <span className={`text-[9px] px-2 py-0.5 tracking-widest uppercase ${
                    inquiry.status === 'new' ? 'text-blue-500' :
                    inquiry.status === 'in_progress' ? 'text-amber-500' : 'text-[#1A1A1A]/40'
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
                <h3 className="font-medium text-sm mb-1">{inquiry.name}</h3>
                <p className="text-xs text-[#1A1A1A]/40 mb-3 truncate">{inquiry.email}</p>
                <p className="text-xs text-[#1A1A1A]/60 line-clamp-2 font-light leading-relaxed">{inquiry.message}</p>
                <div className="mt-4 text-[9px] text-[#1A1A1A]/20 uppercase tracking-widest">
                  {formatDate(inquiry.createdAt)}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail Column */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <div className="bg-white border border-[#1A1A1A]/5 p-10 h-full">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {selectedInquiry.type === 'business' ? <Building size={20} className="text-[#1A1A1A]/60" /> : <Mail size={20} className="text-[#1A1A1A]/60" />}
                    <span className="text-xs tracking-widest uppercase text-[#1A1A1A]/40">{selectedInquiry.type} Inquiry</span>
                  </div>
                  <h2 className="text-2xl font-light mb-2">{selectedInquiry.name}</h2>
                  <p className="text-[#1A1A1A]/40 text-sm">{selectedInquiry.email}</p>
                  {selectedInquiry.company && (
                    <p className="text-[#5A6B58] text-sm mt-2 font-medium flex items-center gap-2">
                      <Archive size={14} /> {selectedInquiry.company}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleToggleRead(selectedInquiry.id, !selectedInquiry.isRead)}
                      className={`p-2 rounded-full transition-colors ${selectedInquiry.isRead ? 'text-[#1A1A1A]/20 hover:text-[#1A1A1A]' : 'text-[#5A6B58] bg-[#5A6B58]/5'}`}
                      title={selectedInquiry.isRead ? "標記為未讀" : "標記為已讀"}
                    >
                      {selectedInquiry.isRead ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="text-[10px] text-[#1A1A1A]/30 uppercase tracking-[0.2em]">
                    Received: {formatDate(selectedInquiry.createdAt)}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h4 className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/30 mb-4 border-b border-[#1A1A1A]/5 pb-2">訊息內容 Message</h4>
                <div className="text-[#1A1A1A]/80 font-light leading-relaxed whitespace-pre-wrap text-sm italic border-l-2 border-[#1A1A1A]/10 pl-6 py-2">
                  "{selectedInquiry.message}"
                </div>
              </div>

              <div className="border-t border-[#1A1A1A]/5 pt-8">
                <h4 className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/30 mb-6">狀態變更 Status Management</h4>
                <div className="flex gap-4">
                  {(['new', 'in_progress', 'closed'] as InquiryStatus[]).map(status => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, status)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 border text-[10px] uppercase tracking-widest transition-all ${
                        selectedInquiry.status === status
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-transparent text-[#1A1A1A]/40 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                      }`}
                    >
                      {status === 'new' && <Clock size={14} />}
                      {status === 'in_progress' && <MessageSquare size={14} />}
                      {status === 'closed' && <CheckCircle2 size={14} />}
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#white] border border-[#1A1A1A]/5 border-dashed p-20 flex flex-col items-center justify-center text-center h-full">
              <Mail size={40} className="text-[#1A1A1A]/10 mb-6" />
              <p className="text-[#1A1A1A]/30 font-light italic">請選擇左側詢問項目以查看詳細內容</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
