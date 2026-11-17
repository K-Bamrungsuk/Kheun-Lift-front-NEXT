// Returns null for non-YouTube links; the caller shows a plain link instead.
export function youtubeEmbedUrl(url: string) {
  const id = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
