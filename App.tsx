import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Book, PenTool, Layout, PlusCircle, ArrowLeft } from 'lucide-react';
import { ViewState, JournalEntry, LibraryItem, LibraryCategory } from './types';
import { LibraryView } from './components/Library';
import { JournalListView, JournalEditor } from './components/Journal';
import { Button, Card, FadeIn } from './components/UI';

// --- Seed Data (Authentic Public Domain Texts) ---
const INITIAL_LIBRARY: LibraryItem[] = [
  {
    id: '1',
    title: 'Sobre la brevedad de la vida',
    author: 'Séneca',
    content: 'No es que tengamos poco tiempo, sino que perdemos mucho. La vida es lo bastante larga, y se ha dado con generosidad suficiente para la realización de las cosas más importantes si se emplea bien toda ella. Pero cuando se desperdicia en el lujo y el descuido, cuando no se gasta en ningún buen fin, forzados al fin por la última necesidad, nos damos cuenta de que ha pasado sin que nos diéramos cuenta de que estaba pasando.',
    category: LibraryCategory.STOICISM,
    isFavorite: true
  },
  {
    id: '2',
    title: 'Meditaciones, Libro IV',
    author: 'Marco Aurelio',
    content: 'Sé como el promontorio contra el que las olas rompen continuamente; pero él se mantiene firme y doma la furia del agua a su alrededor. "Desdichado de mí, porque esto me ha sucedido". No, al contrario: "Afortunado de mí, porque a causa de lo que me ha sucedido, continúo sin pena, ni roto por el presente ni asustado por el futuro".',
    category: LibraryCategory.STOICISM,
    isFavorite: false
  },
  {
    id: '3',
    title: 'Manual de Vida (Enquiridión)',
    author: 'Epicteto',
    content: 'No son las cosas las que perturban a los hombres, sino los juicios que se forman sobre las cosas. Por ejemplo, la muerte no es terrible, pues si lo fuera, a Sócrates también se lo habría parecido; lo terrible es el juicio de que la muerte es terrible.',
    category: LibraryCategory.STOICISM,
    isFavorite: false
  },
  {
    id: '4',
    title: 'Walden',
    author: 'Henry David Thoreau',
    content: 'Fui a los bosques porque quería vivir deliberadamente, enfrentar solo los hechos esenciales de la vida, y ver si no podía aprender lo que ella tenía que enseñar, no sea que cuando estuviera por morir descubriera que no había vivido.',
    category: LibraryCategory.REFLECTION,
    isFavorite: true
  },
  {
    id: '5',
    title: 'Tao Te King, Verso 8',
    author: 'Lao Tse',
    content: 'La bondad suprema es como el agua. El agua beneficia a todas las cosas sin competir con ellas. Mora en los lugares que todos desprecian. Por eso está cerca del Tao.',
    category: LibraryCategory.MINDFULNESS,
    isFavorite: false
  },
  {
    id: '6',
    title: 'La casa de los huéspedes',
    author: 'Rumi',
    content: 'Este ser humano es una casa de huéspedes. Cada mañana una nueva llegada. Una alegría, una depresión, una mezquindad, alguna conciencia momentánea llega como un visitante inesperado. ¡Dales la bienvenida y agasájalos a todos! Incluso si son una multitud de lamentos, que violentamente barren tu casa vaciándola de muebles, aun así, trata a cada huésped honorablemente. Puede que te esté limpiando para algún nuevo deleite.',
    category: LibraryCategory.POETRY,
    isFavorite: true
  },
  {
    id: '7',
    title: 'Ensayos',
    author: 'Michel de Montaigne',
    content: 'La cosa más grande del mundo es saber ser uno mismo. Mi oficio y mi arte es vivir.',
    category: LibraryCategory.REFLECTION,
    isFavorite: false
  },
  {
    id: '8',
    title: 'Poema 254',
    author: 'Emily Dickinson',
    content: 'La esperanza es esa cosa con plumas que se posa en el alma, y entona la melodía sin palabras, y nunca se detiene en absoluto.',
    category: LibraryCategory.POETRY,
    isFavorite: false
  }
];

const App: React.FC = () => {
  // --- State ---
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [library, setLibrary] = useState<LibraryItem[]>(INITIAL_LIBRARY);
  
  // Selection State
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | undefined>(undefined);
  const [selectedLibraryItem, setSelectedLibraryItem] = useState<LibraryItem | undefined>(undefined);

  // --- Effects ---
  useEffect(() => {
    const savedEntries = localStorage.getItem('serenitas_entries');
    const savedLibrary = localStorage.getItem('serenitas_library');
    if (savedEntries) setEntries(JSON.parse(savedEntries));
    if (savedLibrary) {
        // Optional: Merge saved library with initial if needed, currently we replace or load saved
        // Ideally we only use savedLibrary if it exists, otherwise INITIAL
        setLibrary(JSON.parse(savedLibrary));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('serenitas_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('serenitas_library', JSON.stringify(library));
  }, [library]);

  // --- Handlers ---

  const handleSaveEntry = (entry: JournalEntry) => {
    setEntries(prev => {
      const exists = prev.find(e => e.id === entry.id);
      if (exists) return prev.map(e => e.id === entry.id ? entry : e);
      return [entry, ...prev];
    });
    setView(ViewState.JOURNAL);
    setSelectedEntry(undefined);
    setSelectedLibraryItem(undefined);
  };

  const handleCreateNewEntry = () => {
    setSelectedEntry(undefined);
    setSelectedLibraryItem(undefined);
    setView(ViewState.WRITE);
  };

  const handleReflectOnItem = (item: LibraryItem) => {
    setSelectedLibraryItem(item);
    setSelectedEntry(undefined); // New entry based on item
    setView(ViewState.WRITE);
  };

  const handleReadItem = (item: LibraryItem) => {
    setSelectedLibraryItem(item);
    setView(ViewState.READ_ITEM);
  };

  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setView(ViewState.WRITE); // Re-use editor for viewing/editing
  };

  const addToLibrary = (item: LibraryItem) => {
    setLibrary(prev => [item, ...prev]);
  };

  // --- Render Functions ---

  const renderContent = () => {
    switch (view) {
      case ViewState.DASHBOARD:
        return (
          <FadeIn>
            <div className="space-y-8 pb-24">
              <header className="pt-4">
                <h1 className="text-4xl serif font-medium text-stone-800 mb-2">Buenos días.</h1>
                <p className="text-stone-500">Tómate un momento para conectar contigo mismo.</p>
              </header>

              {/* Daily Wisdom Card */}
              <section>
                 <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">Sabiduría Diaria</h3>
                 </div>
                 <div onClick={() => handleReadItem(library[0])} className="bg-stone-800 text-stone-100 p-8 rounded-3xl shadow-xl cursor-pointer transform transition hover:scale-[1.01]">
                    <p className="serif text-xl leading-relaxed italic opacity-90 mb-6">
                        "{library[0].content}"
                    </p>
                    <div className="flex justify-end">
                        <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">— {library[0].author}</span>
                    </div>
                 </div>
              </section>

              {/* Stats/Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                 <div onClick={handleCreateNewEntry} className="bg-teal-50 p-6 rounded-2xl border border-teal-100 cursor-pointer hover:bg-teal-100 transition-colors">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3 text-teal-600">
                        <PlusCircle className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-teal-900">Nueva Entrada</h4>
                    <p className="text-xs text-teal-600 mt-1">Registra tu sentir</p>
                 </div>
                 <div onClick={() => setView(ViewState.JOURNAL)} className="bg-amber-50 p-6 rounded-2xl border border-amber-100 cursor-pointer hover:bg-amber-100 transition-colors">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3 text-amber-600">
                        <Book className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-amber-900">{entries.length} Entradas</h4>
                    <p className="text-xs text-amber-600 mt-1">Ver historial</p>
                 </div>
              </div>

              {/* Recent Entries Preview */}
              {entries.length > 0 && (
                  <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-widest">Reciente</h3>
                    </div>
                    <div className="space-y-3">
                        {entries.slice(0, 2).map(entry => (
                            <Card key={entry.id} onClick={() => handleViewEntry(entry)}>
                                <div className="flex justify-between">
                                    <h4 className="font-medium text-stone-700">{entry.title || "Sin título"}</h4>
                                    <span className="text-xs text-stone-400">{new Date(entry.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-stone-500 line-clamp-1 mt-1">{entry.content}</p>
                            </Card>
                        ))}
                    </div>
                  </section>
              )}
            </div>
          </FadeIn>
        );

      case ViewState.LIBRARY:
        return (
          <FadeIn>
            <LibraryView 
                items={library} 
                onSelectItem={handleReadItem} 
                onAddNewItem={addToLibrary}
            />
          </FadeIn>
        );

      case ViewState.READ_ITEM:
        if (!selectedLibraryItem) return null;
        return (
           <FadeIn>
             <div className="flex flex-col h-[80vh] justify-center max-w-lg mx-auto pb-20">
                <button onClick={() => setView(ViewState.LIBRARY)} className="absolute top-8 left-6 p-2 text-stone-400 hover:text-stone-800">
                    <ArrowLeft />
                </button>
                <div className="text-center space-y-8 px-6">
                    <span className="text-xs font-bold text-stone-400 tracking-[0.2em] uppercase">{selectedLibraryItem.category}</span>
                    <h2 className="text-3xl serif text-stone-800">{selectedLibraryItem.title}</h2>
                    <div className="w-12 h-1 bg-stone-200 mx-auto rounded-full"></div>
                    <p className="text-xl serif leading-loose text-stone-700 italic">
                        "{selectedLibraryItem.content}"
                    </p>
                    <p className="text-stone-500 font-medium">— {selectedLibraryItem.author}</p>
                    
                    <div className="pt-8">
                        <Button onClick={() => handleReflectOnItem(selectedLibraryItem)} className="mx-auto shadow-xl shadow-stone-200">
                            Reflexionar sobre esto
                        </Button>
                    </div>
                </div>
             </div>
           </FadeIn>
        );

      case ViewState.JOURNAL:
        return (
          <FadeIn>
            <JournalListView 
                entries={entries} 
                onNewEntry={handleCreateNewEntry} 
                onSelectEntry={handleViewEntry} 
            />
          </FadeIn>
        );

      case ViewState.WRITE:
        return (
          <FadeIn>
             <JournalEditor 
                entry={selectedEntry} 
                linkedLibraryItem={selectedLibraryItem} 
                onSave={handleSaveEntry} 
                onCancel={() => setView(ViewState.JOURNAL)} 
             />
          </FadeIn>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto min-h-screen p-6 md:p-8 relative">
        {renderContent()}
      </main>

      {/* Navigation Bar (Mobile Style) - Only visible on main tabs */}
      {[ViewState.DASHBOARD, ViewState.LIBRARY, ViewState.JOURNAL].includes(view) && (
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-stone-100 pb-safe pt-2 z-50">
          <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-6">
            <button 
                onClick={() => setView(ViewState.DASHBOARD)}
                className={`flex flex-col items-center gap-1 transition-colors ${view === ViewState.DASHBOARD ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <Layout className="w-6 h-6" strokeWidth={view === ViewState.DASHBOARD ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">Inicio</span>
            </button>
            
            <button 
                onClick={() => setView(ViewState.JOURNAL)}
                className={`flex flex-col items-center gap-1 transition-colors ${view === ViewState.JOURNAL ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <PenTool className="w-6 h-6" strokeWidth={view === ViewState.JOURNAL ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">Diario</span>
            </button>

            <button 
                onClick={() => setView(ViewState.LIBRARY)}
                className={`flex flex-col items-center gap-1 transition-colors ${view === ViewState.LIBRARY ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <Book className="w-6 h-6" strokeWidth={view === ViewState.LIBRARY ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">Lecturas</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;