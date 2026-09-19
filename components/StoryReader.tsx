 "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Story, Vocabulary } from "@/data/types";
import { vocabulary as vocabularyData } from "@/data/vocabulary";

export function StoryReader({ story }: { story: Story }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const sentence = story.sentences[current];

  const currentWords = useMemo(
    () => sentence.vocabularyIds.map((id) => vocabularyData.find((v) => v.id === id)).filter(Boolean) as Vocabulary[],
    [sentence]
  );

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  function speak(text: string, onEnd?: () => void) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.84;
    utterance.onend = () => onEnd?.();
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function playAll() {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    setPlaying(true);
    let index = current;

    const next = () => {
      if (index >= story.sentences.length) {
        setPlaying(false);
        setCurrent(0);
        return;
      }
      setCurrent(index);
      speak(story.sentences[index].text, () => {
        index += 1;
        next();
      });
    };

    next();
  }

  function selectWord(id: string) {
    const word = vocabularyData.find((v) => v.id === id);
    if (word) setSelectedWord(word);
  }

  function renderSentence() {
    let text = sentence.text;
    const targets = currentWords
      .map((v) => v.word)
      .sort((a, b) => b.length - a.length);

    if (!targets.length) return <>{text}</>;

    const regex = new RegExp(`(${targets.map(escapeRegExp).join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) => {
      const match = currentWords.find((v) => v.word.toLowerCase() === part.toLowerCase());
      if (!match) return <span key={index}>{part}</span>;
      return (
        <button
          key={index}
          className="vocab-word"
          onClick={() => selectWord(match.id)}
          type="button"
        >
          {part}
        </button>
      );
    });
  }

  function previous() {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setCurrent((value) => Math.max(0, value - 1));
  }

  function next() {
    window.speechSynthesis.cancel();
    setPlaying(false);
    setCurrent((value) => Math.min(story.sentences.length - 1, value + 1));
  }

  const progress = ((current + 1) / story.sentences.length) * 100;

  return (
    <>
      <section className="reader">
        <div className="reader-progress">
          <span>Story {current + 1} of {story.sentences.length}</span>
          <div className="progress-track"><div style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="sentence-area">
          <span className="sentence-number">{String(current + 1).padStart(2, "0")}</span>
          <p className="sentence-text">{renderSentence()}</p>
          <p className="sentence-hint">
            {currentWords.length ? "Tap an underlined word to see its meaning." : "Listen and repeat the sentence."}
          </p>
        </div>

        <div className="player">
          <button className="round-button" onClick={previous} disabled={current === 0}>←</button>
          <button className="play-button" onClick={playAll}>
            {playing ? "Ⅱ" : "▶"}
          </button>
          <button className="round-button" onClick={next} disabled={current === story.sentences.length - 1}>→</button>
        </div>

        <div className="player-label">{playing ? "Listening…" : "Listen to the story"}</div>

        <div className="word-strip">
          {currentWords.map((word) => (
            <button key={word.id} onClick={() => selectWord(word.id)} type="button">
              {word.word}
            </button>
          ))}
        </div>
      </section>

      {selectedWord && (
        <div className="modal-backdrop" onClick={() => setSelectedWord(null)}>
          <div className="word-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedWord(null)}>×</button>
            <p className="eyebrow">NEW WORD</p>
            <h2>{selectedWord.word}</h2>
            <span className="modal-phonetic">{selectedWord.phonetic}</span>
            <div className="meaning">{selectedWord.meaningVi}</div>
            <button
              className="listen-word"
              onClick={() => speak(selectedWord.word)}
            >
              🔊 Listen
            </button>
            <div className="example">
              <strong>{selectedWord.example}</strong>
              <span>{selectedWord.exampleVi}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}