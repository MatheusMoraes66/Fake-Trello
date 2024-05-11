<script setup lang="ts">
import { useBoardStore } from '#imports';
import { useRouter } from 'vue-router';

const boardStore = useBoardStore();
const router = useRouter();

defineProps({
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

function deleteColumn(columnIndex: number) {
    boardStore.deleteColumn(columnIndex);
}

function goToTask(taskId: number){
    router.push(`/tasks/${taskId}`);
}
</script>


<template>
    <UContainer class="column">
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
            <li v-for="task in column.tasks" :key="task.id">
                <UCard class="mb-4" @click="goToTask(task.id)">
                    <strong>{{ task.name }}</strong>
                    <p>{{ task.description }}</p>
                </UCard>
            </li>
        </ul>
    </UContainer class="column">
</template>