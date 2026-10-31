import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { demoLeaderboard } from "@/features/leaderboard/data/demo";

const steps = [
  { icon: "user", title: "Create Your Profile", description: "Enter your details and discover your weight class." },
  { icon: "shieldCheck", title: "Submit Your Lift", description: "Submit your weight, reps, and video for verification." },
  { icon: "trophy", title: "Climb the Ranking", description: "Compete with lifters in your own weight class." },
] as const;

const rankColors = [
  "border-yellow-300 bg-yellow-400 text-black",
  "border-slate-200 bg-slate-300 text-slate-950",
  "border-orange-500 bg-orange-800 text-orange-100",
];

export function PublicLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
      <a href="#public-content" className="skip-link">Skip to content</a>
      <header className="border-b border-zinc-800">
        <nav aria-label="Public navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <Link href="/" className="shrink-0 text-base font-black tracking-widest sm:text-2xl">KHEUN <span className="text-yellow-500">LIFT</span></Link>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Link href="/login" className="px-2 py-2 text-xs font-semibold text-zinc-300 hover:text-white sm:px-3 sm:text-sm">Log in</Link>
            <Link href="/register" className="rounded-lg bg-yellow-500 px-3 py-2 text-xs font-bold text-zinc-950 hover:bg-yellow-300 sm:px-4 sm:text-sm">Join Now</Link>
          </div>
        </nav>
      </header>

      <main id="public-content" tabIndex={-1} className="flex-1">
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-10 size-72 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2">
            <div className="min-w-0 text-center lg:text-left">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-yellow-500 sm:text-sm">Strength deserves recognition</p>
              <h1 id="hero-title" className="text-4xl font-black leading-tight sm:text-6xl">PROVE YOUR STRENGTH.<span className="block text-yellow-500">CLAIM YOUR RANK.</span></h1>
              <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-400 sm:text-lg lg:mx-0">Track your personal records, submit verified lifts, and compete with lifters in your own weight class.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/register" className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-zinc-950 transition hover:bg-yellow-300">Get Started <Icon name="arrowRight" className="size-[18px]" /></Link>
                <a href="#ranking-preview" className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-bold text-zinc-200 transition hover:border-yellow-500 hover:text-yellow-500">View Leaderboards</a>
              </div>
              <p id="account-access-note" className="mt-4 text-xs leading-5 text-zinc-500">Account registration and login are coming soon.</p>
            </div>

            <section id="ranking-preview" aria-labelledby="ranking-title" className="min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-500">Top Lifters</p>
                  <h2 id="ranking-title" className="mt-1 text-xl font-black">{demoLeaderboard.exercise}</h2>
                  <p className="mt-1 text-xs text-zinc-500">{demoLeaderboard.weightClass} class</p>
                </div>
                <Icon name="trophy" className="size-[30px] shrink-0 text-yellow-500" />
              </div>
              <ol className="space-y-3">
                {demoLeaderboard.entries.slice(0, 3).map((record, index) => (
                  <li key={record.rank} className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 sm:gap-4 sm:px-4">
                    <span className={`grid size-9 shrink-0 place-items-center rounded-xl border font-black ${rankColors[index]}`}>#{record.rank}</span>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{record.athlete}</p><p className="text-xs text-zinc-500">1 rep</p></div>
                    <strong className="whitespace-nowrap text-sm text-yellow-400 sm:text-base">{record.weight} kg</strong>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-center text-xs text-zinc-400">Example leaderboard · Sample data</p>
            </section>
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="steps-title" className="border-y border-zinc-800 bg-zinc-900/40 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-yellow-500">How it works</p><h2 id="steps-title" className="mt-3 text-3xl font-black sm:text-4xl">THREE STEPS TO THE TOP</h2></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                  <div className="mb-5 flex items-center justify-between"><span className="rounded-xl bg-yellow-500/10 p-3 text-yellow-500"><Icon name={step.icon} className="size-[25px]" /></span><span aria-hidden="true" className="text-3xl font-black text-zinc-800">0{index + 1}</span></div>
                  <h3 className="text-lg font-bold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 py-6 text-center text-sm text-zinc-500">© 2026 Kheun Lift. Build your strength. Prove your rank.</footer>
    </div>
  );
}
