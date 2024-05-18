import type { Board } from "./board";

export interface WorkSpace {
    id: string,
    name : string;
    type : { value : string, icon: string};
    description: string;
    boards: Board[];
}