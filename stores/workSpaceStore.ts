import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { WorkSpace } from "~/interfaces/worksapce";
import type { Board } from "~/interfaces/board";

export const useWorkSpaceStore = defineStore('workSpaceStore', () => {
    // States
    const workSpaces: WorkSpace[] = [];
    const store = useStorage('workSpaces', workSpaces);

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

        store.value.push(workSpace);
    }

    function removeWorkSpace(workSpaceId: string) {
        const workSpaceIndex = store.value.findIndex((workSpace) => workSpace.id === workSpaceId);
        if (workSpaceIndex !== -1) {
            store.value.splice(workSpaceIndex, 1);
        }
    }

    function addBoardToWorkSpace(workSpaceId: string, name: string, color: string) {
        const newboard: Board = {
            id :  Math.random().toString().replace("0.", ""),
            name: name,
            color: color,
            columns: []
        }
        const workSpaceIndex = store.value.findIndex((workSpace) => workSpace.id === workSpaceId);
        if (workSpaceIndex !== -1) {
            store.value[workSpaceIndex].boards.push(newboard);
        }
    }

    function removeBoardToWorkSpace(workSpaceId: string, boardId: string) {
        const workSpaceIndex = store.value.findIndex((workSpace) => workSpace.id === workSpaceId);
        
        if (workSpaceIndex !== -1) {
            const boardIndex = workSpaces[workSpaceIndex].boards.findIndex((board) => board.id = boardId)
            if(boardIndex !== -1) {
                store.value[workSpaceIndex].boards.splice(boardIndex, 1);
            }
        }
    }

    // function moveBoardToAnotherWorkspace(fromWorkSpaceId: string, toWorkSpaceId: string, boardId: string) {
    //     const board = workSpaces[fromWorkSpaceId].board.splice(1 , 1)[0];

    //     workSpaces[toWorkSpaceId].boards.splice()
    // }

    return {
        store,
        addWorkSpace,
        removeWorkSpace,
        addBoardToWorkSpace,
        removeBoardToWorkSpace
    }
})