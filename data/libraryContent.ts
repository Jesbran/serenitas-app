import { LibraryItem, LibraryCategory } from "../types";

// Base database of authentic quotes without IDs (IDs are assigned upon discovery)
const LIBRARY_DATABASE: Omit<LibraryItem, 'id' | 'isFavorite'>[] = [
  // ESTOICISMO
  {
    title: "Sobre la ira",
    author: "Séneca",
    content: "La ira: un ácido que puede hacer más daño al recipiente en el que se almacena que a cualquier cosa sobre la que se vierte.",
    category: LibraryCategory.STOICISM
  },
  {
    title: "Meditaciones, Libro VIII",
    author: "Marco Aurelio",
    content: "Recuerda que cambiar de opinión y seguir a quien te corrige es también un acto de libertad. Pues es tu propia acción la que se realiza de acuerdo con tu voluntad y tu juicio.",
    category: LibraryCategory.STOICISM
  },
  {
    title: "Disertaciones",
    author: "Epicteto",
    content: "No esperes que los acontecimientos ocurran como tú quieres. Decide querer que ocurran como ocurren y serás feliz.",
    category: LibraryCategory.STOICISM
  },
  {
    title: "Cartas a Lucilio",
    author: "Séneca",
    content: "Nadie es más infeliz que aquel a quien la adversidad olvida, pues no tiene oportunidad de ponerse a prueba.",
    category: LibraryCategory.STOICISM
  },
  {
    title: "Meditaciones, Libro VII",
    author: "Marco Aurelio",
    content: "Mira hacia el pasado, con sus imperios cambiantes que se alzaron y cayeron, y podrás prever el futuro.",
    category: LibraryCategory.STOICISM
  },

  // MINDFULNESS / TAOISMO
  {
    title: "Tao Te King, Verso 33",
    author: "Lao Tse",
    content: "Quien conoce a los demás es sabio. Quien se conoce a sí mismo está iluminado. Quien vence a los demás es fuerte. Quien se vence a sí mismo es poderoso.",
    category: LibraryCategory.MINDFULNESS
  },
  {
    title: "Tao Te King, Verso 15",
    author: "Lao Tse",
    content: "¿Tienes la paciencia de esperar a que tu lodo se asiente y el agua se aclare? ¿Puedes permanecer inmóvil hasta que la acción correcta surja por sí misma?",
    category: LibraryCategory.MINDFULNESS
  },
  {
    title: "El Sutra del Diamante",
    author: "Buda Gautama",
    content: "Así debéis percibir este mundo cambiante: Como una estrella al amanecer, una burbuja en un arroyo; un relámpago en una nube de verano, una lámpara parpadeante, un fantasma y un sueño.",
    category: LibraryCategory.MINDFULNESS
  },
  {
    title: "Hojas de Hierba",
    author: "Walt Whitman",
    content: "Existo como soy, eso es suficiente. Si nadie más en el mundo se da cuenta, me siento contento. Si todos y cada uno se dan cuenta, me siento contento.",
    category: LibraryCategory.MINDFULNESS
  },

  // REFLEXIÓN / FILOSOFÍA
  {
    title: "Más allá del bien y del mal",
    author: "Friedrich Nietzsche",
    content: "Quien con monstruos lucha cuide de no convertirse a su vez en monstruo. Cuando miras largo tiempo a un abismo, el abismo también mira dentro de ti.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "Ensayos",
    author: "Michel de Montaigne",
    content: "Mi vida ha estado llena de terribles desgracias, la mayoría de las cuales nunca sucedieron.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    content: "Más que amor, dinero o fama, dame la verdad.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "Así habló Zaratustra",
    author: "Friedrich Nietzsche",
    content: "Yo amo a quien vive para conocer, y quiere conocer para que algún día viva el superhombre. Y así quiere él su propio ocaso.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "Paz",
    author: "Desconocido",
    content: "La paz mental llega cuando entiendes que: Lo que esta fuera de tu control también debe estar fuera de tu cabeza",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "La República",
    author: "Platón",
    content: "La victoria más dura es la victoria sobre uno mismo.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "Ética",
    author: "Baruch Spinoza",
    content: "La paz no es la ausencia de guerra, es una virtud, un estado de la mente, una disposición a la benevolencia, la confianza y la justicia.",
    category: LibraryCategory.REFLECTION
  },
  {
    title: "El Profeta",
    author: "Kahlil Gibran",
    content: "Vuestra alegría es vuestra tristeza sin máscara. Y el mismo pozo del que surge vuestra risa, a menudo se llenó con vuestras lágrimas.",
    category: LibraryCategory.REFLECTION
  },

  // POESÍA
  {
    title: "Rimas",
    author: "Gustavo Adolfo Bécquer",
    content: "El alma que hablar puede con los ojos, también puede besar con la mirada.",
    category: LibraryCategory.POETRY
  },
  {
    title: "Soneto",
    author: "Sor Juana Inés de la Cruz",
    content: "En perseguirme, mundo, ¿qué interesas? ¿En qué te ofendo, cuando sólo intento poner bellezas en mi entendimiento y no mi entendimiento en las bellezas?",
    category: LibraryCategory.POETRY
  },
  {
    title: "Campos de Castilla",
    author: "Antonio Machado",
    content: "Caminante, son tus huellas el camino y nada más; Caminante, no hay camino, se hace camino al andar.",
    category: LibraryCategory.POETRY
  },
  {
    title: "Veinte poemas de amor",
    author: "Pablo Neruda",
    content: "Me gustas cuando callas porque estás como ausente, y me oyes desde lejos, y mi voz no te toca.",
    category: LibraryCategory.POETRY
  },
  {
    title: "Odas",
    author: "Rumi",
    content: "Ayer era inteligente y quería cambiar el mundo. Hoy soy sabio y quiero cambiarme a mí mismo.",
    category: LibraryCategory.POETRY
  },
  {
    title: "Nocturno a Rosario",
    author: "Manuel Acuña",
    content: "¡Comprendo que tus besos jamás han de ser míos, comprendo que en tus ojos no me he de ver jamás; y te amo, y en mis locos y ardientes desvaríos bendigo tus desdenes, adoro tus desvíos...",
    category: LibraryCategory.POETRY
  },
  {
    title: "Hojas de Hierba",
    author: "Walt Whitman",
    content: "Creo que una hoja de hierba no es menos que el día de trabajo de las estrellas.",
    category: LibraryCategory.POETRY
  }
];

/**
 * Returns a random authentic item from the dataset.
 */
export const getRandomLibraryItem = (): Omit<LibraryItem, 'id' | 'isFavorite'> => {
  const randomIndex = Math.floor(Math.random() * LIBRARY_DATABASE.length);
  return LIBRARY_DATABASE[randomIndex];
};
