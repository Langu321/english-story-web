import { notFound } from "next/navigation";
import Link from "next/link";
import { stories } from "@/data/stories";
import { StoryReader } from "@/components/StoryReader";

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = stories.find((item) => item.id === id);
  if (!story) notFound();

  return (
    <main className="reader-page">
      <header className="reader-topbar">
        <Link href="/" className="back-link">← Stories</Link>
        <div className="reader-brand">little<span>english</span></div>
        <Link href="/vocabulary" className="words-link">My words</Link>
      </header>

      <div className="reader-shell">
        <div className="reader-intro">
          <div>
            <p className="eyebrow">{story.level} · {story.category}</p>
            <h1>{story.title}</h1>
            <p>{story.description}</p>
          </div>
          <div className={`reader-cover ${story.color}`}>
            <span>{story.symbol}</span>
          </div>
        </div>

        <StoryReader story={story} />
      </div>
    </main>
  );
}