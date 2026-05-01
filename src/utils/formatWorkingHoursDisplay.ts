import type { WorkingHours } from "@/types/workingHours";

/** Та сама логіка, що в Prices: один рядок з Sanity або дефолт. */
export function formatWorkingHoursDisplay(
  wh: WorkingHours | null | undefined,
): string {
  const from = wh?.from;
  const to = wh?.to;
  return from && to ? `${from} - ${to}` : "09:00 - 18:00";
}
