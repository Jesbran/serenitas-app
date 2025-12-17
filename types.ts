export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  JOURNAL = 'JOURNAL',
  LIBRARY = 'LIBRARY',
  WRITE = 'WRITE',
  READ_ITEM = 'READ_ITEM'
}

export enum LibraryCategory {
  STOICISM = 'Estoicismo',
  POETRY = 'Poesía',
  REFLECTION = 'Reflexión',
  MINDFULNESS = 'Mindfulness'
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  content: string;
  category: LibraryCategory;
  isFavorite: boolean;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO string
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  linkedLibraryId?: string; // ID of a library item that inspired this
  aiReflection?: string; // Stored feedback from Gemini
}

export interface UserPreferences {
  userName: string;
  darkMode: boolean;
}
