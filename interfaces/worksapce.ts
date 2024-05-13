import type { Board } from "./board";

export interface WorkSpace {
    id: string,
    name : string;
    type : string;
    description: string;
    boards: Board[];
}