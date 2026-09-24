import Link from "next/link";
import { stories } from "@/data/stories";
import { storyLevelLabels } from "@/data/types";
import { BottomNav } from "@/components/BottomNav";
import { getAssetPath } from "@/utils/path";

export default function Home() {
  return (
    <main className="home-shell">
      <header className="topbar">
        <Link href="/" className="brand">Story Me</Link>
      </header>

      <section className="home-intro">
        <p className="eyebrow">10 minutes a day</p>
        <h1>Learn English<br />through stories.</h1>
        <p>Read a little. Listen a little. Learn a few useful words.</p>
      </section>

      <section className="story-list">
        {stories.map((story) => {
          const sentenceCount = story.pages.reduce(
            (count, page) => count + page.sentences.length,
            0
          );

          return (
            <Link key={story.id} href={`/stories/${story.id}`} className="story-card">
              <img src={getAssetPath(story.coverImage)} alt="" />
              <div>
                <div className="story-meta">
                  <span className={`story-level story-level--${story.level}`}>
                    {storyLevelLabels[story.level]}
                  </span>
                  <span className="story-sentence-count">{sentenceCount} sentences</span>
                </div>
                <h2>{story.title}</h2>
                <p>{story.description}</p>
                <span className="read-story-link">Read story →</span>
              </div>
            </Link>
          );
        })}
      </section>

      <BottomNav />
    </main>
  );
}
