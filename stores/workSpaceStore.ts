import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { WorkSpace } from "~/interfaces/worksapce";
import type { Board } from "~/interfaces/board";

export const useWorkSpaceStore = defineStore('workSpaceStore', () => {
    // States
    const workSpaces: WorkSpace[] = [];

    // Getters
    // const getWorkspaces = computed(() => {
    //     return (workSpaceId: string) => {
    //         for (const boards of workSpaces)
    //     }
    // });

    // Actions
    function addWorkSpace(name:string, type:string, description: string) {
        const workSpace: WorkSpace = {
            id :  Math.random().toString().replace("0.", ""),
            name,
            type,
            description,
            boards: []
        }

        workSpaces.push(workSpace);
    }

    function removeWorkSpace(workSpaceId: string) {
        const workSpaceIndex = workSpaces.findIndex((workSpace) => workSpace.id === workSpaceId);
        if (workSpaceIndex !== -1) {
            workSpaces.splice(workSpaceIndex, 1);
        }
    }

    function addBoardToWorkSpace(workSpaceId: string, newBoard: Board) {
        const workSpaceIndex = workSpaces.findIndex((workSpace) => workSpace.id === workSpaceId);
        if (workSpaceIndex !== -1) {
          workSpaces[workSpaceIndex].boards.push(newBoard);
        }
    }

    function removeBoardToWorkSpace(workSpaceId: string, boardId: string) {
        const workSpaceIndex = workSpaces.findIndex((workSpace) => workSpace.id === workSpaceId);
        
        if (workSpaceIndex !== -1) {
            const boardIndex = workSpaces[workSpaceIndex].boards.findIndex((board) => board.id = boardId)
            if(boardIndex !== -1) {
                workSpaces[workSpaceIndex].boards.splice(boardIndex, 1);
            }
        }
    }

    // function moveBoardToAnotherWorkspace(fromWorkSpaceId: string, toWorkSpaceId: string, boardId: string) {
    //     const board = workSpaces[fromWorkSpaceId].board.splice(1 , 1)[0];

    //     workSpaces[toWorkSpaceId].boards.splice()
    // }

    return {
        workSpaces,
        addWorkSpace,
        removeWorkSpace,
        addBoardToWorkSpace,
        removeBoardToWorkSpace
    }
})