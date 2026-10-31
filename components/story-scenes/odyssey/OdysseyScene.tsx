import { getAssetPath } from "@/utils/path";
import type { StorySceneProps } from "../types";
import styles from "./OdysseyScene.module.css";

const motionAsset = (sceneId: string, fileName: string) =>
  getAssetPath(`/stories/odyssey/scenes/${sceneId}/${fileName}`);

export function OdysseyScene({ playing, sceneId }: StorySceneProps) {
  if (sceneId === "s04") {
    return (
      <div
        className={`${styles.scene} ${styles.journeyScene} ${playing ? styles.playing : ""}`}
        aria-hidden="true"
      >
        <img
          className={`${styles.layer} ${styles.background} ${styles.journeyBackground}`}
          src={motionAsset(sceneId, "background.png")}
          alt=""
        />
        <div className={`${styles.layer} ${styles.resolveGlow}`} />
        <img
          className={`${styles.layer} ${styles.traveler}`}
          src={motionAsset(sceneId, "traveler.png")}
          alt=""
        />
        <img
          className={`${styles.layer} ${styles.wind}`}
          src={motionAsset(sceneId, "wind.png")}
          alt=""
        />
      </div>
    );
  }

  return (
    <div
      className={`${styles.scene} ${playing ? styles.playing : ""}`}
      aria-hidden="true"
    >
      <img
        className={`${styles.layer} ${styles.background}`}
        src={motionAsset(sceneId, "background.png")}
        alt=""
      />
      <img
        className={`${styles.layer} ${styles.clouds}`}
        src={motionAsset(sceneId, "clouds.png")}
        alt=""
      />
      <img
        className={`${styles.layer} ${styles.boat}`}
        src={motionAsset(sceneId, "boat.png")}
        alt=""
      />
      <img
        className={`${styles.layer} ${styles.waves}`}
        src={motionAsset(sceneId, "waves.png")}
        alt=""
      />
    </div>
  );
}
