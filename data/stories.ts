import type { Story } from "./types";
import { odysseyPages } from "./story-pages/odyssey";

/** Keep story metadata here. Long reading data lives in ./story-pages/*.ts */
export const stories: Story[] = [
  {
    id: "odyssey",
    title: "The Odyssey",
    author: "Homer",
    coverImage: "/stories/odyssey/cover.svg",
    description: "A gentle beginner-friendly retelling about a long journey home.",
    pages: odysseyPages,
  },
];
