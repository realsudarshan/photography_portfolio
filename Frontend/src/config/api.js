/** Same-origin `/api` on Vercel; Vite dev server proxies to Express. */
export const API_BASE = import.meta.env.VITE_API_URL || '';

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

/** Resolve blog/media paths stored as `/uploads/...` or absolute URLs. */
export function mediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.VITE_MEDIA_URL || API_BASE;
  return `${base}${path}`;
}
