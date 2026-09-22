import type { Story } from "../types";

/** Story content lives here so the catalogue file stays small. */
export const odysseyPages: Story["pages"] = [
  {
    "id": "page-01",
    "sentences": [
      {
        "id": "s01",
        "text": "I will find my way home, no matter how long the journey takes.",
        "translation": "Tôi sẽ tìm đường trở về nhà, dù hành trình có kéo dài bao lâu.",
        "vocabularyIds": ["journey", "home"],
        "timings": [
          { "word": "I", "start": 0.06, "end": 0.18 },
          { "word": "will", "start": 0.18, "end": 0.28 },
          { "word": "find", "start": 0.28, "end": 0.56 },
          { "word": "my", "start": 0.56, "end": 0.78 },
          { "word": "way", "start": 0.78, "end": 0.94 },
          { "word": "home,", "start": 0.94, "end": 1.32 },
          { "word": "no", "start": 2.0, "end": 2.12 },
          { "word": "matter", "start": 2.12, "end": 2.32 },
          { "word": "how", "start": 2.32, "end": 2.54 },
          { "word": "long", "start": 2.54, "end": 2.82 },
          { "word": "the", "start": 2.82, "end": 3.0 },
          { "word": "journey", "start": 3.0, "end": 3.2 },
          { "word": "takes.", "start": 3.2, "end": 3.54 }
        ]
      },
      {
        "id": "s02",
        "text": "He stood on the shore and looked at the sea in front of him.",
        "translation": "Anh ấy đứng trên bờ biển và nhìn ra vùng biển trước mặt.",
        "vocabularyIds": ["shore"],
        "timings": [
          { "word": "He", "start": 4.18, "end": 4.24 },
          { "word": "stood", "start": 4.24, "end": 4.52 },
          { "word": "on", "start": 4.52, "end": 4.74 },
          { "word": "the", "start": 4.74, "end": 4.88 },
          { "word": "shore", "start": 4.88, "end": 5.12 },
          { "word": "and", "start": 5.12, "end": 5.48 },
          { "word": "looked", "start": 5.48, "end": 5.68 },
          { "word": "at", "start": 5.68, "end": 5.92 },
          { "word": "the", "start": 5.92, "end": 6.04 },
          { "word": "sea", "start": 6.04, "end": 6.3 },
          { "word": "in", "start": 6.3, "end": 6.54 },
          { "word": "front", "start": 6.54, "end": 6.74 },
          { "word": "of", "start": 6.74, "end": 6.94 },
          { "word": "him.", "start": 6.94, "end": 7.08 }
        ]
      },
      {
        "id": "s03",
        "text": "The wind was cold, and the sky was gray and heavy.",
        "translation": "Gió lạnh, và bầu trời xám xịt, nặng nề.",
        "vocabularyIds": ["wind"],
        "timings": [
          { "word": "The", "start": 7.64, "end": 7.72 },
          { "word": "wind", "start": 7.72, "end": 7.96 },
          { "word": "was", "start": 7.96, "end": 8.18 },
          { "word": "cold,", "start": 8.18, "end": 8.46 },
          { "word": "and", "start": 9.24, "end": 9.34 },
          { "word": "the", "start": 9.34, "end": 9.46 },
          { "word": "sky", "start": 9.46, "end": 9.78 },
          { "word": "was", "start": 9.78, "end": 10.04 },
          { "word": "gray", "start": 10.04, "end": 10.32 },
          { "word": "and", "start": 10.32, "end": 10.58 },
          { "word": "heavy.", "start": 10.58, "end": 10.84 }
        ]
      },
      {
        "id": "s04",
        "text": "He felt tired after many years of travel, but he did not give up.",
        "translation": "Anh ấy cảm thấy mệt mỏi sau nhiều năm rong ruổi, nhưng anh không bỏ cuộc.",
        "vocabularyIds": ["tired"],
        "timings": [
          { "word": "He", "start": 11.46, "end": 11.56 },
          { "word": "felt", "start": 11.56, "end": 11.78 },
          { "word": "tired", "start": 11.78, "end": 12.22 },
          { "word": "after", "start": 12.22, "end": 12.64 },
          { "word": "many", "start": 12.64, "end": 12.92 },
          { "word": "years", "start": 12.92, "end": 13.18 },
          { "word": "of", "start": 13.18, "end": 13.38 },
          { "word": "travel,", "start": 13.38, "end": 13.78 },
          { "word": "but", "start": 14.44, "end": 14.54 },
          { "word": "he", "start": 14.54, "end": 14.66 },
          { "word": "did", "start": 14.66, "end": 14.8 },
          { "word": "not", "start": 14.8, "end": 14.98 },
          { "word": "give", "start": 14.98, "end": 15.2 },
          { "word": "up.", "start": 15.2, "end": 15.42 }
        ]
      },
      {
        "id": "s05",
        "text": "Somewhere far away, his home and family were waiting for him.",
        "translation": "Ở một nơi xa, ngôi nhà và gia đình đang chờ anh.",
        "audio": "/stories/odyssey/audio/s05.mp3",
        "vocabularyIds": ["home"],
        "timings": [
          { "word": "Somewhere", "start": 16.1, "end": 16.3 },
          { "word": "far", "start": 16.3, "end": 16.62 },
          { "word": "away,", "start": 16.62, "end": 16.92 },
          { "word": "his", "start": 17.38, "end": 17.46 },
          { "word": "home", "start": 17.46, "end": 17.76 },
          { "word": "and", "start": 17.76, "end": 18.0 },
          { "word": "family", "start": 18.0, "end": 18.4 },
          { "word": "were", "start": 18.4, "end": 18.66 },
          { "word": "waiting", "start": 18.66, "end": 18.94 },
          { "word": "for", "start": 18.94, "end": 19.22 },
          { "word": "him.", "start": 19.22, "end": 19.38 }
        ]
      },
      {
        "id": "s06",
        "text": "He took a deep breath and listened to the sound of the waves.",
        "translation": "Anh hít một hơi thật sâu và lắng nghe tiếng sóng.",
        "vocabularyIds": [],
        "timings": [
          { "word": "He", "start": 19.9, "end": 20.0 },
          { "word": "took", "start": 20.0, "end": 20.16 },
          { "word": "a", "start": 20.16, "end": 20.3 },
          { "word": "deep", "start": 20.3, "end": 20.52 },
          { "word": "breath", "start": 20.52, "end": 20.8 },
          { "word": "and", "start": 20.8, "end": 21.18 },
          { "word": "listened", "start": 21.18, "end": 21.5 },
          { "word": "to", "start": 21.5, "end": 21.78 },
          { "word": "the", "start": 21.78, "end": 21.9 },
          { "word": "sound", "start": 21.9, "end": 22.16 },
          { "word": "of", "start": 22.16, "end": 22.32 },
          { "word": "the", "start": 22.32, "end": 22.42 },
          { "word": "waves.", "start": 22.42, "end": 22.62 }
        ]
      },
      {
        "id": "s07",
        "text": "A storm was coming, but he was ready to continue his journey.",
        "translation": "Một cơn bão đang đến, nhưng anh đã sẵn sàng tiếp tục hành trình.",
        "vocabularyIds": ["storm", "journey"],
        "timings": [
          { "word": "A", "start": 23.28, "end": 23.38 },
          { "word": "storm", "start": 23.38, "end": 23.72 },
          { "word": "was", "start": 23.72, "end": 23.96 },
          { "word": "coming,", "start": 23.96, "end": 24.26 },
          { "word": "but", "start": 25.0, "end": 25.1 },
          { "word": "he", "start": 25.1, "end": 25.26 },
          { "word": "was", "start": 25.26, "end": 25.38 },
          { "word": "ready", "start": 25.38, "end": 25.68 },
          { "word": "to", "start": 25.68, "end": 25.88 },
          { "word": "continue", "start": 25.88, "end": 26.3 },
          { "word": "his", "start": 26.3, "end": 26.58 },
          { "word": "journey.", "start": 26.58, "end": 26.9 }
        ]
      },
      {
        "id": "s08",
        "text": "He looked at the stars and remembered the road back home.",
        "translation": "Anh nhìn những vì sao và nhớ về con đường trở về nhà.",
        "vocabularyIds": ["home"],
        "timings": [
          { "word": "He", "start": 27.52, "end": 27.52 },
          { "word": "looked", "start": 27.52, "end": 27.72 },
          { "word": "at", "start": 27.72, "end": 27.92 },
          { "word": "the", "start": 27.92, "end": 28.06 },
          { "word": "stars", "start": 28.06, "end": 28.44 },
          { "word": "and", "start": 28.44, "end": 28.8 },
          { "word": "remembered", "start": 28.8, "end": 29.24 },
          { "word": "the", "start": 29.24, "end": 29.44 },
          { "word": "road", "start": 29.44, "end": 29.62 },
          { "word": "back", "start": 29.62, "end": 29.84 },
          { "word": "home.", "start": 29.84, "end": 30.2 }
        ]
      },
      {
        "id": "s09",
        "text": "The night was dark, but a small light appeared in the distance.",
        "translation": "Đêm tối, nhưng một ánh sáng nhỏ xuất hiện ở phía xa.",
        "vocabularyIds": [],
        "timings": [
          { "word": "The", "start": 30.76, "end": 30.82 },
          { "word": "night", "start": 30.82, "end": 31.02 },
          { "word": "was", "start": 31.02, "end": 31.22 },
          { "word": "dark,", "start": 31.22, "end": 31.5 },
          { "word": "but", "start": 32.18, "end": 32.28 },
          { "word": "a", "start": 32.28, "end": 32.38 },
          { "word": "small", "start": 32.38, "end": 32.62 },
          { "word": "light", "start": 32.62, "end": 32.98 },
          { "word": "appeared", "start": 32.98, "end": 33.42 },
          { "word": "in", "start": 33.42, "end": 33.64 },
          { "word": "the", "start": 33.64, "end": 33.76 },
          { "word": "distance.", "start": 33.76, "end": 34.12 }
        ]
      },
      {
        "id": "s10",
        "text": "He smiled because, for the first time in years, home felt close.",
        "translation": "Anh mỉm cười vì lần đầu tiên sau nhiều năm, quê nhà dường như đã rất gần.",
        "vocabularyIds": ["home"],
        "timings": [
          { "word": "He", "start": 34.78, "end": 34.86 },
          { "word": "smiled", "start": 34.86, "end": 35.3 },
          { "word": "because,", "start": 35.3, "end": 35.7 },
          { "word": "for", "start": 36.34, "end": 36.44 },
          { "word": "the", "start": 36.44, "end": 36.54 },
          { "word": "first", "start": 36.54, "end": 36.76 },
          { "word": "time", "start": 36.76, "end": 37.02 },
          { "word": "in", "start": 37.02, "end": 37.2 },
          { "word": "years,", "start": 37.2, "end": 37.48 },
          { "word": "home", "start": 37.76, "end": 37.9 },
          { "word": "felt", "start": 37.9, "end": 38.16 },
          { "word": "close.", "start": 38.16, "end": 38.5 }
        ]
      }
    ]
  }
];