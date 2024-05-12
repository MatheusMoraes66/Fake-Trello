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
    });

    function moveTask({ taskIndex, fromColumnIndex, toColumnIndex }: any) {
        const task = board.value.columns[fromColumnIndex].tasks.splice(taskIndex, 1)[0];

        board.value.columns[toColumnIndex].tasks.push(task);
    }

    function addTask({ columnIndex , taskName } : any) {
        board.value.columns[columnIndex].tasks.push({
            id: Math.random().toString().replace("0.", ""),
            name: taskName,
            description: ''
        })
    }

    function deleteTask(taskId : any) {
        for (const column of board.value.columns) {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId)

            if (taskIndex !== -1) {
                column.tasks.splice(taskIndex, 1);
                return ;
            }
        }
    }

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
        getTask,
        addTask,
        deleteTask,
        moveTask
    }
})