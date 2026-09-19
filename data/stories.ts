import type { Story } from "./types";

export const stories: Story[] = [
  {
    id: "morning-at-home",
    title: "A Morning at Home",
    level: "A1",
    category: "Everyday life",
    description: "A quiet morning, a warm kitchen, and a simple breakfast.",
    duration: 3,
    symbol: "☼",
    color: "cream",
    vocabulary: ["morning", "window", "kitchen", "breakfast", "weather", "quiet"],
    sentences: [
      { id: "s1", text: "It is seven o'clock in the morning.", vocabularyIds: ["morning"] },
      { id: "s2", text: "The house is quiet.", vocabularyIds: ["quiet"] },
      { id: "s3", text: "The sun is coming through the window.", vocabularyIds: ["window"] },
      { id: "s4", text: "Lina walks into the kitchen.", vocabularyIds: ["kitchen"] },
      { id: "s5", text: "She looks outside.", vocabularyIds: ["outside"] },
      { id: "s6", text: "The weather is warm and bright.", vocabularyIds: ["weather"] },
      { id: "s7", text: "She makes a simple breakfast.", vocabularyIds: ["simple", "breakfast"] }
    ]
  },
  {
    id: "a-small-walk",
    title: "A Small Walk",
    level: "A1",
    category: "Daily life",
    description: "A short walk around the neighborhood on a sunny afternoon.",
    duration: 3,
    symbol: "⌁",
    color: "sage",
    vocabulary: ["outside", "weather", "quiet"],
    sentences: [
      { id: "s1", text: "Mia goes outside after lunch.", vocabularyIds: ["outside"] },
      { id: "s2", text: "The weather is warm.", vocabularyIds: ["weather"] },
      { id: "s3", text: "The street is quiet.", vocabularyIds: ["quiet"] },
      { id: "s4", text: "She walks slowly and looks at the trees.", vocabularyIds: [] },
      { id: "s5", text: "It is a good afternoon.", vocabularyIds: [] }
    ]
  }
];