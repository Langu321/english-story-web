import type { Story } from "./types";
import { odysseyPages } from "./story-pages/odyssey";
import { happypeoplehappyfoodPages } from "./story-pages/happy-people-happy-food";
import { threefriendsconversationPages } from "./story-pages/three-friends-conversation";

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
  {
    id: "happy-people-happy-food",
    title: "Happy People Happy Food",
    author: "Dr. Hansaji Yogendra",
    coverImage: "/stories/happy-people-happy-food/cover.jpg",
    description: "The Sattvik Kitchen - The Art and Science of Healthy Living",
    pages: happypeoplehappyfoodPages,
  },
  {
    id: "three-friends-conversation",
    title: "Three Friends Conversation",
    author: "Sieu Nhan Hong",
    coverImage: "/stories/three-friends-conversation/cover.png",
    description: "I stole story on Facebook, i think it will be funny",
    pages: threefriendsconversationPages,
  },
];
