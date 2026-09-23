//Đây là file được hỗ trợ từ Gemini
import nextConfig from '../next.config';

export const basePath = nextConfig.basePath || '';

export function getAssetPath(path: string) {
  return `${basePath}${path}`;
}
