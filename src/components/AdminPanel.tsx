import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon, Type, Edit2, X, ChevronUp, ChevronDown, Users, Shield, LayoutDashboard, Film, ScrollText, RefreshCw } from 'lucide-react';
import { MarqueeAdmin } from './MarqueeAdmin';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'motion/react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

let supabase: any = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } else {
    console.warn("Supabase credentials missing");
  }
} catch (error) {
  console.error("Supabase initialization error:", error);
}

interface Slide {
  id: number;
  imageUrl: string;
  text: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  tier: string;
  created_at: string;
}

interface AdminPanelProps {
  adminPass: string;
}

export const AdminPanel = ({ adminPass }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'slides' | 'marquee'>('dashboard');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();

    // Supabase Realtime subscription
    let channel: any;
    if (supabase) {
      channel = supabase
        .channel('admin_sync')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'users' },
          () => {
            fetchUsers();
          }
        )
        .subscribe();
    }

    return () => {
      if (supabase && channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const fetchAllData = async () => {
    setRefreshing(true);
    await Promise.all([fetchSlides(), fetchUsers()]);
    setRefreshing(false);
  };

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/slides');
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch slides:', err);
      setSlides([]);
    }
  };

  const fetchUsers = async () => {
    try {
      const [countRes, usersRes] = await Promise.all([
        fetch('/api/users/count'),
        fetch('/api/users', {
          headers: { 'x-admin-secret': adminPass }
        })
      ]);
      
      const countData = await countRes.json();
      const usersData = await usersRes.json();
      
      setUserCount(countData.count || 0);
      setUsers(Array.isArray(usersData) ? usersData : []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setUsers([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !text) return;

    setLoading(true);
    try {
      const url = editingId ? `/api/slides/${editingId}` : '/api/slides';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminPass
        },
        body: JSON.stringify({ imageUrl, text }),
      });
      
      if (res.ok) {
        setImageUrl('');
        setText('');
        setEditingId(null);
        fetchSlides();
      }
    } catch (err) {
      console.error('Failed to save slide:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (slide: Slide) => {
    setEditingId(slide.id);
    setImageUrl(slide.imageUrl);
    setText(slide.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setImageUrl('');
    setText('');
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;

    const newSlides = [...slides];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newSlides[index];
    newSlides[index] = newSlides[swapIndex];
    newSlides[swapIndex] = temp;

    // Optimistic update
    setSlides(newSlides);

    // Prepare updates for backend
    const updates = newSlides.map((slide, i) => ({
      id: slide.id,
      displayOrder: i
    }));

    try {
      await fetch('/api/slides/reorder', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': adminPass
        },
        body: JSON.stringify({ updates })
      });
    } catch (err) {
      console.error('Failed to reorder:', err);
      fetchSlides(); // Revert on error
    }
  };

  const handleDeleteSlide = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      const res = await fetch(`/api/slides/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': adminPass }
      });
      if (res.ok) {
        fetchSlides();
      }
    } catch (err) {
      console.error('Failed to delete slide:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-rajdhani flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-system-neon tracking-widest uppercase neon-text">Admin Panel</h1>
          <p className="text-slate-500 text-xs mt-1 font-mono">SYSTEM CONTROL v2.0</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-system-neon/20 text-system-neon border border-system-neon/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-bold tracking-wider uppercase text-sm">Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveTab('slides')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'slides' ? 'bg-system-neon/20 text-system-neon border border-system-neon/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Film className="w-5 h-5" />
            <span className="font-bold tracking-wider uppercase text-sm">Slides</span>
          </button>
          
          <button
            onClick={() => setActiveTab('marquee')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'marquee' ? 'bg-system-neon/20 text-system-neon border border-system-neon/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ScrollText className="w-5 h-5" />
            <span className="font-bold tracking-wider uppercase text-sm">Marquee</span>
          </button>
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button 
            onClick={fetchAllData}
            disabled={refreshing}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-xs uppercase font-bold tracking-wider disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-system-neon/30 rounded-xl p-6 shadow-lg flex items-center gap-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-system-neon/5 group-hover:bg-system-neon/10 transition-colors"></div>
                  <div className="w-16 h-16 rounded-full bg-system-neon/10 flex items-center justify-center border border-system-neon/30 relative z-10">
                    <Users className="w-8 h-8 text-system-neon" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Total Hunters</p>
                    <p className="text-4xl font-black text-white font-mono">{userCount}</p>
                  </div>
                </div>
                
                <div className="bg-slate-900 border border-yellow-500/30 rounded-xl p-6 shadow-lg flex items-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-500/5"></div>
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30 relative z-10">
                    <Shield className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">System Status</p>
                    <p className="text-2xl font-black text-white uppercase tracking-wider">Operational</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6 shadow-lg flex items-center gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/5"></div>
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30 relative z-10">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Live Sync</p>
                    <p className="text-2xl font-black text-white uppercase tracking-wider">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-system-neon" /> Recent Registrations
                  </h2>
                  <span className="text-xs text-slate-500 font-mono uppercase">Last 50 Entries</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs uppercase tracking-widest">
                        <th className="p-4 font-bold border-b border-slate-800">Hunter</th>
                        <th className="p-4 font-bold border-b border-slate-800">Designation</th>
                        <th className="p-4 font-bold border-b border-slate-800">Linked At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-slate-500 italic">No hunters registered yet.</td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-4">
                              <div className="flex flex-col">
                                <span className="text-white font-bold">{user.name || 'Unknown'}</span>
                                <span className="text-slate-500 text-xs font-mono">{user.email}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 rounded bg-system-neon/10 text-system-neon text-[10px] uppercase font-bold border border-system-neon/20">
                                {user.tier || 'No Class'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 text-xs font-mono">
                              {new Date(user.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'slides' && (
            <motion.div
              key="slides"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Add/Edit Form */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-system-neon/30 rounded-xl p-6 shadow-lg sticky top-6">
                  <h2 className="text-xl font-bold text-system-neon mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      {editingId ? 'Edit Slide' : 'Add New Slide'}
                    </div>
                    {editingId && (
                      <button onClick={handleCancelEdit} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Image URL
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-system-neon focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                        <Type className="w-4 h-4" /> Slide Text
                      </label>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter slide description..."
                        className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white focus:border-system-neon focus:outline-none transition-colors h-24 resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-system-neon/20 border border-system-neon text-system-neon font-bold rounded hover:bg-system-neon hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                    >
                      {loading ? (editingId ? 'Saving...' : 'Adding...') : (editingId ? 'Save Changes' : 'Add Slide')}
                    </button>
                  </form>
                </div>
              </div>

              {/* Slides List */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">Current Slides ({slides.length})</h2>
                {slides.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-lg bg-slate-900/50">
                    No slides found. Add one to get started.
                  </div>
                ) : (
                  slides.map((slide, index) => (
                    <div key={slide.id} className="flex gap-4 bg-slate-900 border border-slate-800 rounded-lg p-4 group hover:border-system-neon/50 transition-colors shadow-sm">
                      <div className="flex flex-col gap-1 mr-2 justify-center shrink-0">
                        <button 
                          onClick={() => handleReorder(index, 'up')} 
                          disabled={index === 0}
                          className="p-1 text-slate-500 hover:text-system-neon disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleReorder(index, 'down')} 
                          disabled={index === slides.length - 1}
                          className="p-1 text-slate-500 hover:text-system-neon disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="w-32 h-20 rounded overflow-hidden shrink-0 border border-slate-800">
                        <img src={slide.imageUrl} alt="Slide preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <p className="text-slate-300 text-sm">{slide.text}</p>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-[10px] text-slate-500 font-mono">ID: {slide.id}</span>
                          <div className="flex items-center gap-3">
                            <button onClick={() => handleEditClick(slide)} className="text-system-neon hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                              <Edit2 className="w-3 h-3" /> Edit
                            </button>
                            <button onClick={() => handleDeleteSlide(slide.id)} className="text-red-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'marquee' && (
            <motion.div
              key="marquee"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MarqueeAdmin adminPass={adminPass} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

