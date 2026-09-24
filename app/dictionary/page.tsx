"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { vocabulary as vocabularyData } from "@/data/vocabulary";
import { BottomNav } from "@/components/BottomNav";
import { getAssetPath } from "@/utils/path";
import type { Vocabulary } from "@/data/types";

const STORAGE_KEY = "story-english-vocabulary";

export default function DictionaryPage() {
  const [saved, setSaved] = useState<string[]>([]);
  // Khai báo state đúng vị trí bên trong component (nếu bạn cần dùng Modal)
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);

  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      setSaved([]);
    }
  }, []);

  // Lọc các từ đã lưu từ nguồn dữ liệu chuẩn `vocabularyData`
  const words = vocabularyData.filter((word) => saved.includes(word.id));

  function removeWord(id: string) {
    const next = saved.filter((item) => item !== id);
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function listen(audioPath: string | undefined) {
    if (!audioPath) return;

    const wordAudio = new Audio(getAssetPath(audioPath));
    wordAudio.playbackRate = 1;
    wordAudio.play();
  }

  return (
    <main className="dictionary-shell">
      <header className="dictionary-header">
        <Link href="/" className="back-link">← Stories</Link>
        <span>My dictionary</span>
        <span>{words.length} words</span>
      </header>

      <section className="dictionary-intro">
        <p className="eyebrow">YOUR WORDS</p>
        <h1>Words worth<br />remembering.</h1>
        <p>Saved words stay on this device. No account needed.</p>
      </section>

      {words.length === 0 ? (
        <div className="empty-dictionary">
          <div>▱</div>
          <p>Your dictionary is empty.</p>
          <span>Tap an underlined word while reading to save it here.</span>
        </div>
      ) : (
        <div className="word-list">
          {words.map((word) => (
            <article key={word.id} className="dictionary-card">
              {word.image && <img src={getAssetPath(word.image)} alt="" />}
              <div className="dictionary-word-main">
                <h2>{word.word}</h2>
                <span>{word.phonetic}</span>
                <p>{word.meaningVi}</p>
              </div>
              <div className="dictionary-actions">
                <button type="button" onClick={() => listen(word.audio)} aria-label={`Listen to ${word.word}`}>🔊</button>
                <button type="button" onClick={() => removeWord(word.id)} aria-label={`Remove ${word.word}`}>×</button>
              </div>
            </article>
          ))}
        </div>
      )}

      <BottomNav />
    </main>
  );
}