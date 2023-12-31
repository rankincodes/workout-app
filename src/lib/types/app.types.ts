import { Database } from "./database.types";

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Set = Database["public"]["Tables"]["sets"]["Row"];
export type ExerciseSummary = Database["public"]["Functions"]["get_exercise_summary_per_day"]["Returns"][0];