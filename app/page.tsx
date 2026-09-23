import Link from "next/link";
import { stories } from "@/data/stories";
import { BottomNav } from "@/components/BottomNav";
import { getAssetPath } from "@/utils/path";

export default function Home() {
  return (
    <main className="home-shell">
      <header className="topbar">
        <Link href={getAssetPath("/")} className="brand">story english</Link>
      </header>

      <section className="home-intro">
        <p className="eyebrow">10 minutes a day</p>
        <h1>Learn English<br />through stories.</h1>
        <p>Read a little. Listen a little. Learn a few useful words.</p>
      </section>

      <section className="story-list">
        {stories.map((story) => (
          <Link key={story.id} href={`/stories/${story.id}`} className="story-card">
            <img src={getAssetPath(story.coverImage)} alt="" />
            <div>
              <p className="card-kicker">Beginner · {story.pages[0].sentences.length} sentences</p>
              <h2>{story.title}</h2>
              <p>{story.description}</p>
              <span>Read story →</span>
            </div>
          </Link>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}
