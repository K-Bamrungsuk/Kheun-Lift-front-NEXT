import type { Exercise } from "@/features/lifts/types";
import { genderSchema, type WeightClass } from "@/features/user/types";
import { FilterPill, Pill } from "./filter-pill";

export function ExerciseTabs({
  exercises,
  current,
  gender,
  weightClass,
}: {
  exercises: Exercise[];
  current: number;
  gender: string;
  weightClass?: string;
}) {
  return (
    <nav
      aria-label="Exercise"
      className="grid grid-cols-3 gap-1 rounded-xl border border-border bg-surface-low p-1 text-sm sm:max-w-md sm:text-base"
    >
      {exercises.map((item) => (
        <Pill
          key={item.id}
          segment
          query={{ exercise: item.id, gender, weightClass }}
          active={item.id === current}
        >
          {item.name}
        </Pill>
      ))}
    </nav>
  );
}

export function LeaderboardFilters({
  exerciseId,
  gender,
  classes,
  weightClass,
  classLabel,
}: {
  exerciseId: number;
  gender: string;
  classes: WeightClass[];
  weightClass?: string;
  classLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* A new key remounts the pill after a pick, which closes its modal. */}
      <FilterPill
        key={gender}
        id="gender-title"
        title="Gender"
        value={gender}
      >
        <nav aria-label="Gender" className="grid grid-cols-2 gap-2 capitalize">
          {genderSchema.options.map((value) => (
            <Pill
              key={value}
              query={{ exercise: exerciseId, gender: value }}
              active={gender === value}
            >
              {value}
            </Pill>
          ))}
        </nav>
      </FilterPill>
      {classLabel && (
        <FilterPill key={weightClass} id="class-title" title="Class" value={classLabel}>
          <nav aria-label="Weight class" className="grid grid-cols-4 gap-2">
            {classes.map((item) => (
              <Pill
                key={item.id}
                query={{ exercise: exerciseId, gender, weightClass: item.id }}
                active={String(item.id) === weightClass}
              >
                {item.name}
              </Pill>
            ))}
          </nav>
        </FilterPill>
      )}
    </div>
  );
}
