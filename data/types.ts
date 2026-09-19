export type Vocabulary = {
  id: string;
  word: string;
  phonetic: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
};

export type Sentence = {
  id: string;
  text: string;
  vocabularyIds: string[];
};

export type Story = {
  id: string;
  title: string;
  level: "A1" | "A2";
  category: string;
  description: string;
  duration: number;
  symbol: string;
  color: string;
  vocabulary: string[];
  sentences: Sentence[];
};