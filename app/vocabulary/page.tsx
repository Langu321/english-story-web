import Link from "next/link";
import { vocabulary } from "@/data/vocabulary";

export default function VocabularyPage() {
  return (
    <main>
      <header className="topbar">
        <Link href="/" className="brand">little<span>english</span></Link>
        <nav>
          <Link href="/">Stories</Link>
          <Link href="/vocabulary" className="active-nav">Vocabulary</Link>
        </nav>
      </header>

      <section className="vocab-page">
        <p className="eyebrow">YOUR WORDS</p>
        <h1>Vocabulary</h1>
        <p className="vocab-lead">Words introduced in the stories.</p>

        <div className="vocab-grid">
          {vocabulary.map((word) => (
            <article className="vocab-card" key={word.id}>
              <div>
                <h2>{word.word}</h2>
                <span className="phonetic">{word.phonetic}</span>
              </div>
              <p>{word.meaningVi}</p>
              <small>{word.example}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}