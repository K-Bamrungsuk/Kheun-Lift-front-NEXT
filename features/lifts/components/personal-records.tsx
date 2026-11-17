import { getPersonalRecords } from "../personal-record";
import type { LiftRecord } from "../types";

export function PersonalRecords({ lifts }: { lifts: LiftRecord[] }) {
  return (
    <section aria-labelledby="records-title" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="records-title"
          className="text-xs font-semibold uppercase tracking-widest text-muted"
        >
          Personal records
        </h2>
      </div>
      <dl className="grid grid-cols-3 gap-2.5">
        {getPersonalRecords(lifts).map(({ name, best }) => (
          <div key={name} className="min-w-0 rounded-xl bg-surface p-3 md:p-5">
            <dt className="text-xs text-muted">{name}</dt>
            <dd className="mt-3 text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">
              {best ? best.weight : "—"}
              {best && (
                <span className="ml-1 text-xs font-normal text-muted">kg</span>
              )}
            </dd>
            <dd className="mt-2 text-[11px] text-muted">
              {best ? `${best.reps} rep max` : "No verified lift"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
