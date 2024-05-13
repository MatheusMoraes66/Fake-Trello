import type { Column } from "./columns";

export interface Board {
    id: string;
    name : string;
    columns: Column[];
}