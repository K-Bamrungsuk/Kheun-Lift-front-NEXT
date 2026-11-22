const paths = {
  trophy: "M8 3h8v6a4 4 0 0 1-8 0ZM8 5H4v3a4 4 0 0 0 4 4M16 5h4v3a4 4 0 0 1-4 4M12 13v6M8 21h8M10 19h4",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  user: "M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  dumbbell: "m7 7 10 10M4 8l4-4 3 3-4 4ZM13 17l4-4 3 3-4 4ZM2 5l3-3M19 22l3-3",
  plus: "M12 5v14M5 12h14",
  camera: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3ZM15 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  pencil:"M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  chevronDown: "m6 9 6 6 6-6",
  x: "M18 6 6 18M6 6l12 12",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  shieldCheck: "M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7ZM8 12l3 3 5-6",
  weight: "M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6 8h12l3 13H3Z",
  alert: "M21.73 18 13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01",
};

export function Icon({ name, className = "size-5" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
