// shortcut: fixed to Thai time, show the date in the viewer's zone if users abroad join.
export const formatLiftDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });
