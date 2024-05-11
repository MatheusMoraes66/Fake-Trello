import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import boardData from '~/data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
    const board = useStorage('board', boardData);

    const getTask = computed(() => {
        return (taskId : string) => {
            for (const column of board.value.columns) {
                const task = column.tasks.find(task => task.id === taskId);
                if (task) return task;
            }
        }
    })

    function addColumn(columnName: string) {
        board.value.columns.push({
            id: Math.random().toString().replace("0.", ""),
            name: columnName,
            tasks: []
        })
    } 

    function deleteColumn(columnIndex: number) {
        board.value.columns.splice(columnIndex, 1);
    }

    return {
        board,
        addColumn,
        deleteColumn,
        getTask
    }
})