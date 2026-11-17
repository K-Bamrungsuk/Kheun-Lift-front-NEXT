import { expect, test } from "vitest";
import { youtubeEmbedUrl } from "./youtube";

const embed = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ";

test.each([
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=5s",
  "https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ",
  "https://youtu.be/dQw4w9WgXcQ?t=10",
  "https://youtube.com/shorts/dQw4w9WgXcQ",
  "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "https://www.youtube.com/live/dQw4w9WgXcQ",
])("embeds %s", (url) => expect(youtubeEmbedUrl(url)).toBe(embed));

test.each(["https://vimeo.com/123456789", "https://youtu.be/short"])(
  "returns null for %s",
  (url) => expect(youtubeEmbedUrl(url)).toBeNull(),
);
