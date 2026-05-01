import { cache } from "react";
import { WORKING_HOURS_QUERY } from "@/lib/queries";
import type { WorkingHours } from "@/types/workingHours";
import { fetchSanityData } from "@/utils/fetchSanityData";

export const getWorkingHours = cache(async () =>
  fetchSanityData<WorkingHours>(WORKING_HOURS_QUERY),
);
