"use client";

import { useEffect, useRef, useState } from "react";
import type { Story, Vocabulary } from "@/data/types";
import { vocabulary as vocabularyData } from "@/data/vocabulary";
import { getAssetPath } from "@/utils/path";

const STORAGE_KEY = "story-english-vocabulary";

type Timing = {
  word: string;
  start: number;
  end: number;
};

type ReaderSentence = {
  id: string;
  text: string;
  translation?: string;
  audio?: string;
  vocabularyIds: string[];
  timings: Timing[];
};

type ReaderPage = {
  id: string;
  title?: string;
  audio?: string;
  sentences: ReaderSentence[];
};

export function StoryReader({ story }: { story: Story }) {
  const pages = story.pages as ReaderPage[];
  const [pageIndex, setPageIndex] = useState(0);
  const page = pages[pageIndex];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stopAtRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [activeWord, setActiveWord] = useState(-1);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Vocabulary | null>(null);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      setSaved(value ? JSON.parse(value) : []);
    } catch {
      setSaved([]);
    }
  }, []);

  const sentences = page?.sentences ?? [];
  const current = sentences[currentSentence];

  const pageAudio = getAssetPath(
    page?.audio ||
    `/stories/${story.id}/audio/${page?.id ?? `page-${pageIndex + 1}`}.mp3`
  );

  const progress =
    duration > 0
      ? Math.min(100, (currentTime / duration) * 100)
      : sentences.length
        ? Math.min(100, ((currentSentence + 1) / sentences.length) * 100)
        : 0;

  function stopAnimationLoop() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }

  function syncFromAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    const time = audio.currentTime;
    setCurrentTime(time);

    const sentenceIndex = sentences.findIndex((item) => {
      const firstWord = item.timings[0];
      const lastWord = item.timings[item.timings.length - 1];
      if (!firstWord || !lastWord) return false;
      return time >= firstWord.start && time <= lastWord.end + 0.2;
    });

    if (sentenceIndex >= 0 && sentenceIndex !== currentSentence) {
      setCurrentSentence(sentenceIndex);
      // setShowTranslation(false);
    }

    const activeSentence = sentences[sentenceIndex >= 0 ? sentenceIndex : currentSentence];
    if (activeSentence) {
      const wordIndex = activeSentence.timings.findIndex(
        (timing) => time >= timing.start && time < timing.end
      );
      setActiveWord(wordIndex);
    } else {
      setActiveWord(-1);
    }

    if (stopAtRef.current !== null && time >= stopAtRef.current) {
      audio.pause();
      audio.currentTime = stopAtRef.current;
      stopAtRef.current = null;
      setPlaying(false);
      setActiveWord(-1);
      stopAnimationLoop();
      return;
    }

    if (!audio.paused && !audio.ended) {
      rafRef.current = requestAnimationFrame(syncFromAudio);
    }
  }

  function startAnimationLoop() {
    stopAnimationLoop();
    rafRef.current = requestAnimationFrame(syncFromAudio);
  }

  async function playFrom(time?: number, stopAt?: number) {
    const audio = audioRef.current;
    if (!audio) return;

    window.speechSynthesis?.cancel();
    stopAtRef.current = stopAt ?? null;

    if (typeof time === "number") {
      audio.currentTime = time;
    }

    try {
      await audio.play();
      setPlaying(true);
      startAnimationLoop();
    } catch {
      setPlaying(false);
    }
  }

  function pauseAudio() {
    audioRef.current?.pause();
    stopAtRef.current = null;
    setPlaying(false);
    setActiveWord(-1);
    stopAnimationLoop();
  }

  function playPage() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      pauseAudio();
      return;
    }

    if (audio.ended) {
      audio.currentTime = 0;
      setCurrentSentence(0);
    }

    playFrom();
  }

  function playSentence(index: number) {
    const item = sentences[index];
    if (!item || !item.timings.length) return;

    setCurrentSentence(index);
    // setShowTranslation(false);

    const startTime = item.timings[0].start;
    const endTime = item.timings[item.timings.length - 1].end;
    playFrom(startTime, endTime);
  }

  function replayCurrent() {
    playSentence(currentSentence);
  }

  function changeSpeed(value: number) {
    setSpeed(value);
    if (audioRef.current) {
      audioRef.current.playbackRate = value;
    }
  }

  function speakWord(wordItem: Vocabulary) {
    if (!wordItem || !wordItem.audio) return;

    // Tạm dừng bài đọc chính nếu đang chạy
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaying(false);
    stopAnimationLoop();

    // Khởi tạo và phát file MP3 từ vựng
    const wordAudio = new Audio(getAssetPath(wordItem.audio));
    wordAudio.playbackRate = speed;
    wordAudio.play();
  }

  function openWord(id: string) {
    const word = vocabularyData.find((item) => item.id === id);
    if (!word) return;

    // Dừng audio bài đọc chính một cách trực tiếp
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaying(false);
    stopAnimationLoop();

    // Mở Modal
    setSelectedWord(word);

    // Truyền nguyên đối tượng `word` (có thuộc tính .audio) vào hàm speakWord
    speakWord(word);
  }

  function closeWord() {
    window.speechSynthesis?.cancel();
    speechRef.current = null;
    setSelectedWord(null);
  }

  function saveWord(word: Vocabulary) {
    const next = saved.includes(word.id) ? saved : [...saved, word.id];
    setSaved(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function goPage(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= pages.length) return;

    pauseAudio();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setPageIndex(nextIndex);
    setCurrentSentence(0);
    setActiveWord(-1);
    setCurrentTime(0);
    setDuration(0);
    setShowTranslation(false);
  }

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.playbackRate = speed;
    audioRef.current = audio;

    const onLoaded = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const onEnded = () => {
      stopAtRef.current = null;
      setPlaying(false);
      setActiveWord(-1);
      setCurrentTime(audio.duration || 0);
      stopAnimationLoop();
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("ended", onEnded);

    audio.src = pageAudio;
    audio.load();

    return () => {
      stopAnimationLoop();
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [pageAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (!playing || !current?.id) return;

    document
      .getElementById(`sentence-${current.id}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [currentSentence, playing, current?.id]);

  useEffect(() => {
    return () => {
      stopAnimationLoop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  function renderSentence(sentence: ReaderSentence, sentenceIndex: number) {
    const vocabulary = sentence.vocabularyIds
      .map((id) => vocabularyData.find((word) => word.id === id))
      .filter(Boolean) as Vocabulary[];

    const vocabularyMap = new Map(
      vocabulary.map((word) => [normalizeWord(word.word), word])
    );

    // 1. Tách chuỗi đơn giản theo khoảng trắng như bản cũ
    const tokens = sentence.text.split(/(\s+)/);

    let timingIndex = 0;

    return tokens.map((token, tokenIndex) => {
      // Nếu là khoảng trắng -> render giữ nguyên
      if (/^\s+$/.test(token)) {
        return <span key={`${sentence.id}-space-${tokenIndex}`}>{token}</span>;
      }

      const cleanToken = normalizeWord(token);
      const vocabularyWord = vocabularyMap.get(cleanToken);

      // 2. Tự động so sánh với timing hiện tại (chỉ khớp khi cleanToken chính xác)
      let matchedIndex = -1;
      if (
        timingIndex < sentence.timings.length &&
        normalizeWord(sentence.timings[timingIndex].word) === cleanToken
      ) {
        matchedIndex = timingIndex;
        timingIndex += 1; // Chỉ tăng khi từ khớp
      }

      const isActive =
        playing &&
        sentenceIndex === currentSentence &&
        matchedIndex >= 0 &&
        matchedIndex === activeWord;

      if (!vocabularyWord) {
        return (
          <span
            key={`${sentence.id}-word-${tokenIndex}`}
            className={isActive ? "story-word word-active" : "story-word"}
          >
            {token}
          </span>
        );
      }

      return (
        <button
          key={`${sentence.id}-vocab-${tokenIndex}`}
          type="button"
          className={
            isActive
              ? "story-word vocab-word word-active"
              : "story-word vocab-word"
          }
          onClick={() => openWord(vocabularyWord.id)}
        >
          {token}
        </button>
      );
    });
  }

  if (!page || !sentences.length) {
    return null;
  }

  return (
    <>
      <main className="reader-shell">
        <section className="reader-cover-wrap">
          <div className="reader-cover">
            <img src={getAssetPath(story.coverImage)} alt="" />

            <div className="cover-overlay">
              <a href={getAssetPath("/")} className="back-button" aria-label="Back to stories">
                ←
              </a>

              <div className="cover-title">
                <p>{story.author}</p>
                <h1>{story.title}</h1>
              </div>
            </div>

            <div className="reader-cover-progress">
              <div className="reader-cover-progress-meta">
                <span>{String(currentSentence + 1).padStart(2, "0")}</span>
                <span>{String(sentences.length).padStart(2, "0")}</span>
              </div>

              <div className="reader-cover-progress-track">
                <div
                  className="reader-cover-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="story-page">
          <header className="story-heading">
            <div>
              <p className="eyebrow">READING</p>
              <h2>{page.title || `Page ${pageIndex + 1}`}</h2>
            </div>

            <span>
              {pageIndex + 1} / {pages.length}
            </span>
          </header>

          <div className="story-text">
            {sentences.map((sentence, index) => (
              <article
                key={sentence.id}
                id={`sentence-${sentence.id}`}
                className={
                  index === currentSentence
                    ? "sentence-block sentence-active"
                    : "sentence-block"
                }
              >
                <p>{renderSentence(sentence, index)}</p>

                <button
                  type="button"
                  className="sentence-audio"
                  onClick={() => playSentence(index)}
                  aria-label={`Play sentence ${index + 1}`}
                >
                  ▶
                </button>

                {index === currentSentence && showTranslation && (
                  <p className="sentence-translation">
                    {sentence.translation}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="reader-page-navigation">
            <button
              type="button"
              onClick={() => goPage(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              ← Previous
            </button>

            <span>
              Page {pageIndex + 1} of {pages.length}
            </span>

            {pageIndex === pages.length - 1 ? (
              <button
                type="button"
                className="reader-finish-link"
                onClick={() => {
                  window.location.href = getAssetPath("/");
                }}
              >
                Finished
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goPage(pageIndex + 1)}
              >
                Next →
              </button>
            )}
          </div>
        </section>
      </main>

      <nav className="reader-bottom-nav" aria-label="Reading controls">
        <button
          type="button"
          onClick={playPage}
          className={playing ? "reader-play-fab active" : "reader-play-fab"}
          aria-label={playing ? "Pause" : "Listen"}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>

        <button type="button" onClick={replayCurrent} className="nav-control">
          <span className="nav-icon">↻</span>
          <span>Replay</span>
        </button>

        <button
          type="button"
          className={showTranslation ? "nav-control active" : "nav-control"}
          onClick={() => setShowTranslation((value) => !value)}
        >
          <span className="nav-icon">文</span>
          <span>{showTranslation ? "Hide VN" : "VN"}</span>
        </button>

        <label>
          <select className="nav-control speed-control"
            value={speed}
            onChange={(event) => changeSpeed(Number(event.target.value))}
            aria-label="Reading speed"
          >
            <option value={0.5}>0.5×</option>
            <option value={0.75}>0.75×</option>
            <option value={1}>1×</option>
          </select>
        </label>
      </nav>

      {selectedWord && (
        <div className="modal-layer" onClick={closeWord}>
          <div
            className="word-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="popup-close"
              onClick={closeWord}
              aria-label="Close"
            >
              ×
            </button>

            {selectedWord.image && (
              <img className="word-image" src={getAssetPath(selectedWord.image)} alt="" />
            )}

            <div className="word-content">
              <div className="word-topline">
                <div>
                  <h2>{selectedWord.word}</h2>
                  <span>{selectedWord.phonetic}</span>
                </div>

                <button
                  type="button"
                  className="word-listen"
                  onClick={() => speakWord(selectedWord)}
                  aria-label={`Listen to ${selectedWord.word}`}
                >
                  ▶
                </button>
              </div>

              <p className="word-meaning">{selectedWord.meaningVi}</p>

              <div className="word-example">
                <strong>{selectedWord.example}</strong>
                <span>{selectedWord.exampleVi}</span>
              </div>

              <button
                type="button"
                className={`save-word ${saved.includes(selectedWord.id) ? "is-saved" : ""
                  }`}
                onClick={() => saveWord(selectedWord)}
              >
                {saved.includes(selectedWord.id)
                  ? "✓ Saved to dictionary"
                  : "＋ Save to dictionary"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function normalizeWord(value: string) {
  return value
    .toLowerCase()
    .replace(/[“”"'’.,!?;:()[\]{}]+/g, "")
    .trim();
}