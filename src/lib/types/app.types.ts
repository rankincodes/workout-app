import { Database } from "./database.types";

export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type Set = Database["public"]["Tables"]["sets"]["Row"];
export type SetStat = {
    date: string
    max: number
}