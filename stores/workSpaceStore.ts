import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { WorkSpace } from "~/interfaces/worksapce";
import type { Board } from "~/interfaces/board";

export const useWorkSpaceStore = defineStore('workSpaceStore', () => {
    // States
    const workSpaces: WorkSpace[] = [];
    const store = useStorage('workSpaces', workSpaces);

    // Getters
    const getBoard = computed(() => {
        return (workSpaceId: string, boardId: string) => {
            const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
            if(workSpaceIndex !== -1){
                for (const board of store.value[workSpaceIndex].boards) {
                    if(board.id === boardId) {
                        return board;
                    }
                }

            }
        }
    });

    // Actions
    function addWorkSpace(name:string, type:any, description: string) {
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

    function addColumnToBoard(workSpaceId: string, boardId: string, columnName: string) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1){
                store.value[workSpaceIndex].boards[boardIndex].columns.push({
                    id: Math.random().toString().replace("0.", ""),
                    name: columnName,
                    tasks: []
                })
            }
        }
    } 

    function deleteColumnFromBoard(workSpaceId: string, boardId: string, columnIndex: number) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1){
                store.value[workSpaceIndex].boards[boardIndex].columns.splice(columnIndex, 1);
            }
        }
    }

    function addTaskFromColumn(workSpaceId: string, boardId: string,{ columnIndex , taskName } : any) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1){
                store.value[workSpaceIndex].boards[boardIndex].columns[columnIndex].tasks.push({
                    id: Math.random().toString().replace("0.", ""),
                    name: taskName,
                    description: ''
                })
            }
        }
    }

    function deleteTaskFromColumn(workSpaceId: string, boardId: string, taskId : any) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1){
                for (const column of store.value[workSpaceIndex].boards[boardIndex].columns) {
                    const taskIndex = column.tasks.findIndex(task => task.id === taskId)
        
                    if (taskIndex !== -1) {
                        column.tasks.splice(taskIndex, 1);
                        return ;
                    }
                }
            }
        }
   
    }

    function moveTaskToOtherColumn(workSpaceId: string, boardId: string, { fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex }: any) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1) {
                const task = store.value[workSpaceIndex].boards[boardIndex].columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0];

                store.value[workSpaceIndex].boards[boardIndex].columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task)
            }
        }
    }

    function changePositionOfColumn(workSpaceId: string, boardId: string, {fromColumnIndex, toColumnIndex  }: any) {
        const workSpaceIndex = store.value.findIndex((item) => item.id === workSpaceId);
        if(workSpaceIndex !== -1) {
            const boardIndex = store.value[workSpaceIndex].boards.findIndex((item) => item.id === boardId);
            if(boardIndex !== -1) {
                const column = store.value[workSpaceIndex].boards[boardIndex].columns.splice(fromColumnIndex, 1)[0];

                store.value[workSpaceIndex].boards[boardIndex].columns.splice(toColumnIndex, 0, column);
            }
        }
    }

    return {
        store,
        getBoard,
        addWorkSpace,
        removeWorkSpace,
        addBoardToWorkSpace,
        removeBoardToWorkSpace,
        addColumnToBoard,
        deleteColumnFromBoard,
        deleteTaskFromColumn,
        addTaskFromColumn,
        moveTaskToOtherColumn,
        changePositionOfColumn
    }
})