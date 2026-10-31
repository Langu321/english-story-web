import type { ComponentType } from "react";
import { getAssetPath } from "@/utils/path";
import { OdysseyScene } from "./odyssey/OdysseyScene";
import type { StorySceneProps } from "./types";

type StorySceneRendererProps = Omit<StorySceneProps, "sceneId"> & {
  storyId: string;
  sceneId?: string;
  coverImage: string;
  title: string;
};

const storySceneRenderers: Record<string, ComponentType<StorySceneProps>> = {
  odyssey: OdysseyScene,
};

export function StoryScene({
  storyId,
  sceneId,
  coverImage,
  title,
  playing,
}: StorySceneRendererProps) {
  const Scene = sceneId ? storySceneRenderers[storyId] : undefined;

  if (Scene && sceneId) {
    return <Scene playing={playing} sceneId={sceneId} />;
  }

  return (
    <img
      className="reader-cover-image"
      src={getAssetPath(coverImage)}
      alt={`Cover for ${title}`}
    />
  );
}
