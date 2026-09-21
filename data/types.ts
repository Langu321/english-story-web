export type Vocabulary = {
  id: string;
  word: string;
  phonetic: string;
  meaningVi: string;
  image?: string;
  example: string;
  exampleVi: string;
};

export type StorySentence = {
  id: string;
  text: string;
  translation: string;
  audio?: string;
  vocabularyIds: string[];
  timings?: { word: string; start: number; end: number }[];
};

export type StoryPage = {
  id: string;
  sentences: StorySentence[];
};

export type Story = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  pages: StoryPage[];
};
