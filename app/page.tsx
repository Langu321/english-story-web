import Link from "next/link";
import { stories } from "@/data/stories";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="brand">little<span>english</span></Link>
        <nav>
          <Link href="/">Stories</Link>
          <Link href="/vocabulary">Vocabulary</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">ENGLISH FOR BEGINNERS</p>
          <h1>Learn English<br /><em>through stories.</em></h1>
          <p className="hero-text">
            Read a little. Listen a little. Learn a few useful words at a time.
          </p>
          <a className="primary-button" href="#stories">Explore stories <span>↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun"></div>
          <div className="hill hill-one"></div>
          <div className="hill hill-two"></div>
          <div className="window-frame">
            <div className="window-sky"></div>
            <div className="window-cross v"></div>
            <div className="window-cross h"></div>
          </div>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">START HERE</p>
            <h2>Choose a story</h2>
          </div>
          <p className="section-note">Short stories · A1–A2</p>
        </div>

        <div className="story-grid">
          {stories.map((story) => (
            <Link href={`/stories/${story.id}`} className="story-card" key={story.id}>
              <div className={`story-cover ${story.color}`}>
                <span className="cover-level">{story.level}</span>
                <div className="cover-symbol">{story.symbol}</div>
                <span className="cover-duration">{story.duration} min</span>
              </div>
              <div className="story-card-body">
                <div className="story-meta">
                  <span>{story.category}</span>
                  <span>·</span>
                  <span>{story.vocabulary.length} new words</span>
                </div>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <span className="read-link">Read story <span>→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>littleenglish</span>
        <span>Read · Listen · Learn</span>
      </footer>
    </main>
  );
}