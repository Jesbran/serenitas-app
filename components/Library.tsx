import React, { useState } from 'react';
import { BookOpen, Sparkles, ChevronRight, Heart, Feather } from 'lucide-react';
import { LibraryItem, LibraryCategory } from '../types';
import { Card, Tag, Button } from './UI';
import { getRandomLibraryItem } from '../data/libraryContent';

interface LibraryProps {
  items: LibraryItem[];
  onSelectItem: (item: LibraryItem) => void;
  onAddNewItem: (item: LibraryItem) => void;
}

export const LibraryView: React.FC<LibraryProps> = ({ items, onSelectItem, onAddNewItem }) => {
  const [filter, setFilter] = useState<string>('All');

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(i => i.category === filter);

  const handleGenerateNew = () => {
    // Instant generation from local database without API calls or delays
    const newItemData = getRandomLibraryItem();
    const newItem: LibraryItem = {
      ...newItemData,
      id: Date.now().toString(),
      isFavorite: false
    };
    onAddNewItem(newItem);
  };

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl serif text-stone-800">Biblioteca</h2>
          <p className="text-stone-500 text-sm mt-1">Reflexiones para el alma</p>
        </div>
        <Button 
            variant="secondary" 
            onClick={handleGenerateNew} 
            className="!px-3 !py-2 text-sm"
        >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Descubrir</span>
        </Button>
      </header>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === 'All' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}
        >
          Todos
        </button>
        {Object.values(LibraryCategory).map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === cat ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} onClick={() => onSelectItem(item)} className="group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-stone-400" />
            </div>
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                    <Tag label={item.category} color="bg-stone-100 text-stone-500" />
                    {item.isFavorite && <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />}
                </div>
                <h3 className="text-xl serif font-medium text-stone-800 leading-snug mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm line-clamp-3 leading-relaxed">
                    {item.content}
                </p>
              </div>
              <div className="flex items-center gap-2 text-stone-400 text-xs font-medium uppercase tracking-wider">
                <Feather className="w-3 h-3" />
                {item.author}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-stone-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No hay lecturas en esta categoría.</p>
        </div>
      )}
    </div>
  );
};