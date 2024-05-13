import type { Board } from "./board";

export interface WorkSpace {
    name : string;
    type : string;
    description: string;
    boards: Board[];
}