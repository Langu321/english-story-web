"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Story, StorySentence, Vocabulary } from "@/data/types";
import { vocabulary } from "@/data/vocabulary";

const STORAGE_KEY = "story-english-vocabulary";

type PlaybackMode = "idle" | "playing" | "paused";

export function StoryReader({ story }: { story: Story }) {
  const page = story.pages[0];
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [mode, setMode] = useState<PlaybackMode>("idle");
  const [currentSentence, setCurrentSentence] = useState(0);
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [speed, setSpeed] = useState(0.85);
  const [showTranslation, setShowTranslation] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      setSaved(value ? JSON.parse(value) : []);
    } catch {
      setSaved([]);
    }
  }, []);

  useEffect(() => {
    return () => stopEverything();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wordsInStory = useMemo(() => {
    const ids = new Set(page.sentences.flatMap((sentence) => sentence.vocabularyIds));
    return vocabulary.filter((word) => ids.has(word.id));
  }, [page]);

  const current = page.sentences[currentSentence];
  const currentWords = wordsInStory.filter((word) => current.vocabularyIds.includes(word.id));

  function stopEverything() {
    audioRef.current?.pause();
    if (audioRef.current) {
      audioRef.current.ontimeupdate = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    fallbackRef.current = null;
    setMode("idle");
    setActiveWord(null);
  }

  function setSentence(index: number) {
    const safeIndex = Math.max(0, Math.min(index, page.sentences.length - 1));
    setCurrentSentence(safeIndex);
    setActiveWord(null);
    setShowTranslation(false);
  }

  function findWordIndex(sentence: StorySentence, charIndex: number) {
    let cursor = 0;
    const tokens = sentence.text.split(/(\s+)/);
    for (const token of tokens) {
      const start = cursor;
      const end = cursor + token.length;
      if (charIndex >= start && charIndex < end && token.trim()) {
        const wordsBefore = sentence.text.slice(0, start).trim().split(/\s+/).filter(Boolean).length;
        return wordsBefore;
      }
      cursor = end;
    }
    return null;
  }

  function speakFallback(sentence: StorySentence, index: number, continuePage: boolean) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence.text);
    utterance.lang = "en-US";
    utterance.rate = speed;
    utterance.onboundary = (event) => {
      const wordIndex = findWordIndex(sentence, event.charIndex);
      if (wordIndex !== null) setActiveWord(wordIndex);
    };
    utterance.onend = () => {
      fallbackRef.current = null;
      setActiveWord(null);
      if (continuePage && index < page.sentences.length - 1) {
        playSentence(index + 1, true);
      } else {
            setMode("idle");
      }
    };
    utterance.onerror = () => {
      fallbackRef.current = null;
        setMode("idle");
      setActiveWord(null);
    };
    fallbackRef.current = utterance;
    setSentence(index);
    setMode("playing");
    window.speechSynthesis.speak(utterance);
  }

  function updateActiveWord(audio: HTMLAudioElement, sentence: StorySentence) {
    if (!sentence.timings?.length) return;
    const time = audio.currentTime;
    const index = sentence.timings.findIndex((item) => time >= item.start && time < item.end);
    setActiveWord(index === -1 ? null : index);
  }

  function playSentence(index: number, continuePage = false) {
    const sentence = page.sentences[index];
    setSentence(index);

    audioRef.current?.pause();
    window.speechSynthesis.cancel();
    setActiveWord(null);

    if (!sentence.audio) {
      speakFallback(sentence, index, continuePage);
      return;
    }

    const audio = new Audio(sentence.audio);
    audio.preload = "auto";
    audio.playbackRate = speed;
    audioRef.current = audio;
    setMode("playing");

    audio.ontimeupdate = () => updateActiveWord(audio, sentence);
    audio.onended = () => {
      setActiveWord(null);
      audioRef.current = null;
      if (continuePage && index < page.sentences.length - 1) {
        playSentence(index + 1, true);
      } else {
            setMode("idle");
      }
    };
    audio.onerror = () => speakFallback(sentence, index, continuePage);

    audio.play().catch(() => speakFallback(sentence, index, continuePage));
  }

  function playPage() {
    if (mode === "playing") {
      audioRef.current?.pause();
      window.speechSynthesis?.pause();
      setMode("paused");
      return;
    }

    if (mode === "paused") {
      if (audioRef.current) {
        audioRef.current.play();
      } else {
        window.speechSynthesis?.resume();
      }
      setMode("playing");
      return;
    }

    playSentence(currentSentence, true);
  }

  function replayCurrent() {
    playSentence(currentSentence, false);
  }

  function changeSpeed(value: number) {
    setSpeed(value);
    if (audioRef.current) audioRef.current.playbackRate = value;
    if (fallbackRef.current) fallbackRef.current.rate = value;
  }

  function saveWord(word: Vocabulary) {
    const next = saved.includes(word.id) ? saved : [...saved, word.id];
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function speakWord(word: Vocabulary) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  function renderSentence(sentence: StorySentence, sentenceWords: Vocabulary[]) {
    const tokens = sentence.text.split(/(\s+)/);
    let wordIndex = 0;
    const sentenceIndex = page.sentences.findIndex((item) => item.id === sentence.id);

    return tokens.map((part, index) => {
      const clean = part.replace(/[.,!?;:"'“”‘’()]/g, "");
      const isWordToken = Boolean(clean && part.trim());
      const currentWordIndex = wordIndex;
      if (isWordToken) wordIndex += 1;

      if (!isWordToken) return <span key={index}>{part}</span>;

      const vocabularyWord = sentenceWords.find(
        (word) => word.word.toLowerCase() === clean.toLowerCase()
      );
      const active = currentSentence === sentenceIndex && activeWord === currentWordIndex;
      const className = active ? "story-word word-active" : "story-word";

      if (!vocabularyWord) {
        return <span key={index} className={className}>{part}</span>;
      }

      return (
        <button
          key={index}
          type="button"
          className={`${className} vocab-word`}
          onClick={() => setSelectedWord(vocabularyWord)}
        >
          {part}
        </button>
      );
    });
  }

  return (
    <main className="reader-shell">
      <div className="reader-cover-wrap">
        <div className="reader-cover">
          <img src={story.coverImage} alt="" />
          <div className="cover-overlay">
            <Link href="/" className="back-button" aria-label="Back to stories">←</Link>
            <div className="cover-title">
              <p>{story.author}</p>
              <h1>{story.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <article className="story-page">
        <div className="story-heading">
          <div>
            <p className="eyebrow">BEGINNER READING</p>
            <h2>Read slowly. Listen. Say it yourself.</h2>
          </div>
          <span>{page.sentences.length} sentences</span>
        </div>

        <div className="story-text">
          {page.sentences.map((sentence, index) => {
            const sentenceWords = vocabulary.filter((word) => sentence.vocabularyIds.includes(word.id));
            const activeSentence = currentSentence === index;
            return (
              <div key={sentence.id} className={`sentence-block ${activeSentence ? "sentence-active" : ""}`}>
                <p>{renderSentence(sentence, sentenceWords)}</p>
                <button
                  type="button"
                  className="sentence-audio"
                  onClick={() => playSentence(index, false)}
                  aria-label={`Listen to sentence ${index + 1}`}
                >
                  {activeSentence && mode === "playing" ? "Ⅱ" : "▶"}
                </button>
                {activeSentence && showTranslation && <p className="sentence-translation">{sentence.translation}</p>}
              </div>
            );
          })}
        </div>

        <div className="page-note">
          <span>Tip</span>
          Tap an underlined word to see its meaning and save it to your dictionary.
        </div>
      </article>

      <nav className="reader-bottom-nav" aria-label="Reading controls">
        {/* Nút 1: Listen / Resume */}
        <button type="button" onClick={playPage} className={mode === "playing" ? "nav-control active" : "nav-control"}>
          <span className="nav-icon">{mode === "playing" ? "Ⅱ" : "▶"}</span>
          <span>{mode === "paused" ? "Resume" : "Listen"}</span>
        </button>

        {/* Nút 2: Replay */}
        <button type="button" onClick={replayCurrent} className="nav-control">
          <span className="nav-icon">↻</span>
          <span>Replay</span>
        </button>

        {/* Nút 3: Translation (Chính giữa / hoặc vị trí thứ 3) */}
        <button
          type="button"
          className={`nav-control ${showTranslation ? "active" : ""}`}
          onClick={() => setShowTranslation((value) => !value)}
        >
          <span className="nav-icon">🌐</span>
          <span>{showTranslation ? "Hide VN" : "VN"}</span>
        </button>

        {/* Nút 4: Speed */}
        <label className="nav-control speed-control">
          <select value={speed} onChange={(event) => changeSpeed(Number(event.target.value))} aria-label="Reading speed">
            <option value="0.5">0.5×</option>
            <option value="0.75">0.75×</option>
            <option value="1">1×</option>
          </select>
        </label>
      </nav>

      {selectedWord && (
        <div className="modal-layer" onClick={() => setSelectedWord(null)}>
          <div className="word-popup" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="popup-close" onClick={() => setSelectedWord(null)}>×</button>
            {selectedWord.image && <img src={selectedWord.image} alt="" className="word-image" />}
            <div className="word-content">
              <div className="word-topline">
                <div>
                  <h2>{selectedWord.word}</h2>
                  <span>{selectedWord.phonetic}</span>
                </div>
                <button type="button" className="word-listen" onClick={() => speakWord(selectedWord)}>🔊</button>
              </div>
              <p className="word-meaning">{selectedWord.meaningVi}</p>
              <div className="word-example"><strong>{selectedWord.example}</strong><span>{selectedWord.exampleVi}</span></div>
              <button type="button" className={`save-word ${saved.includes(selectedWord.id) ? "is-saved" : ""}`} onClick={() => saveWord(selectedWord)}>
                {saved.includes(selectedWord.id) ? "✓ Saved to dictionary" : "＋ Save to dictionary"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
