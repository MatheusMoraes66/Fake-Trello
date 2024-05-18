<script setup lang="ts">
import { useBoardStore } from '#imports';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const params = computed(() => {
    const params = route.params.id.toString().split('-');
    return {
        workSpaceId: params[0],
        boardId: params[1]
    }
})

const workSpace = useWorkSpaceStore();


const props = defineProps({
    column: {
        type: Object,
        required: true
    },
    columnIndex: {
        type: Number,
        required: true
    }
})

const editNameState = ref(false);
const newTaskName = ref('');

function deleteColumn(columnIndex: number) {
    workSpace.deleteColumnFromBoard(params.value.workSpaceId, params.value.boardId, columnIndex);
}

function goToTask(taskId: number) {
    router.push(`/tasks/${taskId}`);
}

function addTask() {
    workSpace.addTaskFromColumn(params.value.workSpaceId, params.value.boardId, {
        columnIndex: props.columnIndex,
        taskName: newTaskName.value
    })
    newTaskName.value = '';
}

function pickupTask(event: any, { fromColumnIndex, fromTaskIndex }: any) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('type', 'task');
    event.dataTransfer.setData('from-column-index', fromColumnIndex)
    event.dataTransfer.setData('from-task-index', fromTaskIndex)
}

function dropItem(event: any, { toColumnIndex, toTaskIndex }: any) {
    const type = event.dataTransfer.getData('type');
    const fromColumnIndex = event.dataTransfer.getData('from-column-index');

    if (type === 'task') {
        const fromTaskIndex = event.dataTransfer.getData('from-task-index');
        workSpace.moveTaskToOtherColumn(
            params.value.workSpaceId, params.value.boardId,
            {
                fromTaskIndex,
                toTaskIndex,
                fromColumnIndex,
                toColumnIndex
            }
        )
    }

    if (type === 'column') {
        workSpace.changePositionOfColumn(
            params.value.workSpaceId, params.value.boardId,
            {
                fromColumnIndex,
                toColumnIndex
            }
        )

    }
}

function pickupColumn(event: any, fromColumnIndex: any) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData('type', 'column');
    event.dataTransfer.setData('from-column-index', fromColumnIndex)
}

</script>


<template>
    <UContainer class="column" draggable="true" @dragstart.self="pickupColumn($event, columnIndex)" @dragenter.prevent
        @dragover.prevent @drop.stop="dropItem($event, { toColumnIndex: columnIndex })">
        <div class="column-header mb-4">
            <div>
                <UInput v-if="editNameState" type="text" v-model="column.name" />
                <h2 v-else class="mb-4">{{ column.name }}</h2>
            </div>
            <div>
                <UButton icon="i-heroicons-pencil-square" class="mr-2" @click="editNameState = !editNameState">Edit
                </UButton>
                <UButton icon="i-heroicons-trash" color="red" @click="deleteColumn(columnIndex)">Delete</UButton>
            </div>
        </div>
        <ul>
            <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
                <UCard class="mb-4" @click="goToTask(task.id)" draggable="true" @dragstart="
                    pickupTask($event, {
                        fromColumnIndex: columnIndex,
                        fromTaskIndex: taskIndex
                    })
                    " @drop.stop="dropItem($event, { toColumnIndex: columnIndex, toTaskIndex: taskIndex })">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>
        </ul>
        <UInput v-model="newTaskName" type="text" placeholder="Add new Column" icon="i-heroicons-plus-circle-solid"
            @keyup.enter="addTask" />
    </UContainer class="column">
</template>