<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router';

const workSpace = useWorkSpaceStore();

const route = useRoute();
const router = useRouter();

const params = computed(() => {
    const params = route.params.id.toString().split('-');

    return {
        workSpaceId: params[0],
        boardId: params[1]
    }
}) 

const boardStore = computed(() => {
    return  workSpace.getBoard(params.value.workSpaceId, params.value.boardId);
})

const newColumnName = ref('');

const isModalOpen = computed(() => {
    return route.name === 'index-tasks-id'
})

function addColumn() {
    workSpace.addColumnToBoard(params.value.workSpaceId, params.value.boardId, newColumnName.value);
    newColumnName.value = ''
}

function closeModal() {
    router.push(`/board/${params.value.workSpaceId}-${params.value.boardId}`)
}

</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <BoardColumn
                v-for="(column, columnIndex) in boardStore.columns" 
                :key="column.name"
                :column="column"
                :columnIndex="columnIndex"
            />
            <UContainer class="column">
                <UInput 
                    v-model="newColumnName"
                    type="text" 
                    placeholder="Add new Column" 
                    icon="i-heroicons-plus-circle-solid" 
                    @keyup.enter="addColumn"
                />
            </UContainer>
        </main>
        <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
            <NuxtPage :key="route.fullPath"/>
        </div>
    </div>
</template>