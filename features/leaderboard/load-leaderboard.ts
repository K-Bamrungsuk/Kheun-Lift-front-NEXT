import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { getExercises } from "@/features/lifts/api-server";
import type { User } from "@/features/user/types";
import { getLeaderboard, getWeightClasses } from "./api-server";

// Private cache lets the exercise links prefetch this page per user; the result stays in that user's browser.
export async function loadLeaderboard(
  query: { exercise?: string; gender?: string; weightClass?: string },
  me: User,
) {
  "use cache: private";
  cacheLife({ stale: 30 });

  const exercises = await getExercises();
  const exercise = query.exercise
    ? exercises.find((item) => String(item.id) === query.exercise)
    : exercises[0];
  if (!exercise) notFound();

  const gender = query.gender ?? me.gender ?? "male";
  const weightClassPromise = getWeightClasses(gender);

  // Pill links carry the class, so only a first visit or a gender switch waits for the class list.
  let weightClass = query.weightClass;
  if (!weightClass) {
    const fallback = me.weightClass?.gender === gender ? me.weightClass : (await weightClassPromise)[0];
    weightClass = String(fallback.id);
  }

  const [classes, entries] = await Promise.all([
    weightClassPromise,
    getLeaderboard({ exerciseId: exercise.id, weightClassId: weightClass, gender }),
  ]);
  return { exercises, exercise, gender, classes, weightClass, entries };
}
