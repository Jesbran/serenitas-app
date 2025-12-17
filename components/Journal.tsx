import React, { useState, useEffect } from 'react';
import { Calendar, PenLine, Sparkles, ArrowLeft, Save, Link2 } from 'lucide-react';
import { JournalEntry, LibraryItem } from '../types';
import { Card, Button } from './UI';

// --- Journal List View ---

interface JournalListProps {
  entries: JournalEntry[];
  onNewEntry: () => void;
  onSelectEntry: (entry: JournalEntry) => void;
}

export const JournalListView: React.FC<JournalListProps> = ({ entries, onNewEntry, onSelectEntry }) => {
  // Sort by date descending
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 pb-24">
      <header className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl serif text-stone-800">Mi Diario</h2>
          <p className="text-stone-500 text-sm mt-1">Un espacio seguro para tu mente</p>
        </div>
        <Button onClick={onNewEntry}>
          <PenLine className="w-4 h-4" />
          <span className="hidden sm:inline">Escribir</span>
        </Button>
      </header>

      <div className="space-y-4">
        {sortedEntries.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenLine className="w-6 h-6 text-stone-400" />
            </div>
            <h3 className="text-stone-600 font-medium mb-1">Tu historia comienza hoy</h3>
            <p className="text-stone-400 text-sm mb-4 max-w-xs mx-auto">Escribe tus pensamientos, miedos y gratitudes para cultivar la paz interior.</p>
            <Button variant="ghost" onClick={onNewEntry}>Empezar a escribir</Button>
          </div>
        ) : (
          sortedEntries.map((entry) => (
            <Card key={entry.id} onClick={() => onSelectEntry(entry)} className="group transition-all hover:border-stone-300">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-400 uppercase tracking-widest">
                    <Calendar className="w-3 h-3" />
                    {new Date(entry.date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  {entry.linkedLibraryId && <Link2 className="w-4 h-4 text-teal-500" />}
                </div>
                
                <h3 className="text-xl serif font-medium text-stone-800 group-hover:text-teal-700 transition-colors">
                  {entry.title || "Sin título"}
                </h3>
                
                <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                  {entry.content}
                </p>

                {entry.tags.length > 0 && (
                    <div className="flex gap-2 mt-1">
                        {entry.tags.map(t => <span key={t} className="text-xs text-stone-400">#{t}</span>)}
                    </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// --- Journal Editor View ---

interface JournalEditorProps {
  entry?: JournalEntry; // If undefined, new entry
  linkedLibraryItem?: LibraryItem;
  onSave: (entry: JournalEntry) => void;
  onCancel: () => void;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({ entry, linkedLibraryItem, onSave, onCancel }) => {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  
  // We keep the data if it exists (legacy), but we removed the ability to generate new ones.
  const aiAnalysis = entry?.aiReflection;

  // If we are starting a fresh entry from a library item
  useEffect(() => {
    if (!entry && linkedLibraryItem && !content) {
        setTitle(`Reflexión: ${linkedLibraryItem.title}`);
    }
  }, [linkedLibraryItem, entry, content]);

  const handleSave = () => {
    if (!content.trim()) return;
    
    const newEntry: JournalEntry = {
      id: entry?.id || Date.now().toString(),
      date: entry?.date || new Date().toISOString(),
      title: title || 'Pensamiento del día',
      content,
      tags: [], // Could implement auto-tagging here
      linkedLibraryId: linkedLibraryItem?.id || entry?.linkedLibraryId,
      aiReflection: aiAnalysis
    };
    onSave(newEntry);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="p-2 -ml-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
            <Button onClick={handleSave} className="!px-4 !py-2">
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Guardar</span>
            </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
        
        {linkedLibraryItem && (
            <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2 mb-2 text-teal-700 text-xs font-bold uppercase tracking-wider">
                    <Link2 className="w-3 h-3" />
                    Reflexionando sobre
                </div>
                <p className="serif text-stone-700 italic">"{linkedLibraryItem.content}"</p>
                <p className="text-right text-xs text-stone-500 mt-2">— {linkedLibraryItem.author}</p>
            </div>
        )}

        <input 
          type="text" 
          placeholder="Título (opcional)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-2xl serif font-medium text-stone-800 placeholder:text-stone-300 outline-none"
        />
        
        <textarea 
          placeholder="¿Qué ocupa tu mente hoy? Deja que tus pensamientos fluyan..." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[40vh] bg-transparent resize-none text-lg leading-relaxed text-stone-600 placeholder:text-stone-300 outline-none font-serif"
        />

        {/* Legacy AI Feedback Section (Read Only) */}
        {aiAnalysis && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gradient-to-br from-indigo-50 to-stone-50 p-6 rounded-2xl border border-indigo-100/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-24 h-24 text-indigo-500" />
                </div>
                <h4 className="text-indigo-900 font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Reflexión Guardada
                </h4>
                <p className="serif text-stone-700 leading-relaxed italic text-lg">
                    "{aiAnalysis}"
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};