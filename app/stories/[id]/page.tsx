import { notFound } from "next/navigation";
import { stories } from "@/data/stories";
import { StoryReader } from "@/components/StoryReader";

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const story = stories.find((item) => item.id === id);
  if (!story) notFound();
  return <StoryReader story={story} />;
}
