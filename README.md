# English Story Web — mobile-first prototype

A simple English-learning reader for beginners.

## Current UX
- Mobile-first story reading.
- Sticky cover image occupying about 25% of the viewport height.
- 8–10 sentences can live on one story page.
- Bottom reading bar: Listen / Replay / Speed.
- Each sentence can be played independently.
- Play can continue through the current page and stops at the end of the page.
- Tap vocabulary words to open a small vocabulary card.
- Save words to a device-only dictionary with localStorage.
- Main navigation also has Stories / Dictionary / Soon.
- Word-by-word highlighting reads timing data from each sentence.

## Audio + timings
Put audio files here:

`public/stories/odyssey/audio/page-01.mp3`

and so on.

Each sentence can contain:

```ts
timings: [
  { word: "I", start: 0.00, end: 0.18 },
  { word: "will", start: 0.18, end: 0.42 },
]
```

Times are seconds from the beginning of that sentence's MP3.

If an MP3 is missing, the prototype falls back to browser Speech Synthesis.

### Vocabulary Audio Generation (Google Colab)
To generate clean .mp3 audio files for individual vocabulary words without installing additional dependencies locally, use the prepared Google Colab Notebook: [Generate Vocabulary Audio Notebook](https://colab.research.google.com/drive/1sG6i7aAM6Ee5lPB1_frCrY5-7EWcAqfL?usp=sharing)

## Run

```bash
npm install
npm run dev
```
