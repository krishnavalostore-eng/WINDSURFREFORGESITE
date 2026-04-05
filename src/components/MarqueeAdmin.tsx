import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon, Type, Edit2, X, ChevronUp, ChevronDown } from 'lucide-react';

interface MarqueeItem {
  id: number;
  imageUrl: string;
  text: string;
}

interface MarqueeAdminProps {
  adminPass: string;
}

export const MarqueeAdmin = ({ adminPass }: MarqueeAdminProps) => {
  const [items, setItems] = useState<MarqueeItem[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/marquee');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch marquee items:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !text) return;

    setLoading(true);
    try {
      const url = editingId ? `/api/marquee/${editingId}` : '/api/marquee';
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
        fetchItems();
      }
    } catch (err) {
      console.error('Failed to save marquee item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item: MarqueeItem) => {
    setEditingId(item.id);
    setImageUrl(item.imageUrl);
    setText(item.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setImageUrl('');
    setText('');
  };

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[swapIndex];
    newItems[swapIndex] = temp;

    // Optimistic update
    setItems(newItems);

    // Prepare updates for backend
    const updates = newItems.map((item, i) => ({
      id: item.id,
      displayOrder: i
    }));

    try {
      await fetch('/api/marquee/reorder', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': adminPass
        },
        body: JSON.stringify({ updates })
      });
    } catch (err) {
      console.error('Failed to reorder:', err);
      fetchItems(); // Revert on error
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      const res = await fetch(`/api/marquee/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': adminPass }
      });
      if (res.ok) {
        fetchItems();
      }
    } catch (err) {
      console.error('Failed to delete marquee item:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
        <h2 className="text-3xl font-bold text-system-neon tracking-widest uppercase neon-text mb-2">Marquee Management</h2>
        <p className="text-slate-400">Manage System Interface Marquee Images</p>
      </div>

      {/* Add/Edit Form */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800/50 border border-system-neon/30 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-system-neon mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {editingId ? 'Edit Item' : 'Add New Item'}
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
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-system-neon focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" /> Display Text
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter display text..."
                className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-system-neon focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-system-neon/20 border border-system-neon text-system-neon font-bold rounded hover:bg-system-neon hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (editingId ? 'Saving...' : 'Adding...') : (editingId ? 'Save Changes' : 'Add Item')}
            </button>
          </form>
        </div>
      </div>

      {/* Existing Items */}
      <div className="lg:col-span-2">
        <div className="bg-slate-800/50 border border-system-neon/30 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-system-neon mb-6">Current Items ({items.length})</h2>
          
          {items.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-slate-700 rounded-lg">
              No items found. Add one to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="flex gap-4 bg-slate-900 border border-slate-700 rounded-lg p-4 group hover:border-system-neon/50 transition-colors">
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
                      disabled={index === items.length - 1}
                      className="p-1 text-slate-500 hover:text-system-neon disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="w-24 h-32 rounded overflow-hidden shrink-0 border border-slate-800 relative">
                    <img src={item.imageUrl.includes('cloudinary.com') && !item.imageUrl.includes('q_auto') ? item.imageUrl.replace('/upload/', '/upload/q_auto,f_auto/') : item.imageUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2">
                      <span className="text-[10px] text-system-neon font-bold truncate px-1">{item.text}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-slate-400 text-sm break-all">{item.imageUrl}</p>
                      <p className="text-white font-bold">{item.text}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-xs text-slate-500 font-mono">ID: {item.id}</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-system-neon/70 hover:text-system-neon flex items-center gap-1 text-sm font-bold transition-colors"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-500/70 hover:text-red-500 flex items-center gap-1 text-sm font-bold transition-colors"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
