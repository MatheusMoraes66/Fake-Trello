<script setup lang="ts">
import { useWorkSpaceStore } from '~/stores/workSpaceStore';

const isOpenWorkSpace = ref(false);
const isBoards = ref(false);
const selectWorkSpace = ref('');

const workSpaceStore = useWorkSpaceStore();

if (workSpaceStore.store.length === 0) {
    openModalWorkSpace();
}

function openModalWorkSpace() {
    isOpenWorkSpace.value = true;
}

function closeModalWorkSpace() {
    isOpenWorkSpace.value = false;
}

function openModalBoard(workspace: string) {
    isBoards.value = true;
    selectWorkSpace.value = workspace;
}

function closeModalBoard() {
    isBoards.value = false;
}

</script>

<template>
    <UContainer>
        <div class="flex justify-between mt-4 mb-4">
            <h1 class="text-2xl font-bold">Suas areas de trabalho</h1>
            <UButton icon="i-heroicons-plus-16-solid" color="white" @click="openModalWorkSpace"></UButton>
        </div>
        <UDivider  size="sm" />
        <div v-if="workSpaceStore.store.length > 0" v-for="workSpace in workSpaceStore.store" class="mb-6 mt-3">
            <div class="flex items-center w-auto h-12 mb-3 gap-2">
                <UBadge color="gray" variant="solid" class="w-[30px] h-[30px] flex items-center justify-center">
                    <UIcon :name="workSpace.type.icon" dynamic />
                </UBadge>
                <h2 class="font-bold text-lg">
                    {{ workSpace.name }}
                </h2>
            </div>
            <div class="grid lg:grid-cols-4 gap-4 sm:grid-cols-2 max-md:justify-center min-md:grid-cols-3 ">
                <div v-for="board in workSpace.boards">
                    <UCard :key="board.id" class="w-64 h-[8rem] flex items-center justify-center">
                    <div class="flex justify-center items-center gap-3">
                        <p class="text-xl">{{ board.name }}</p>
                    </div>
                </UCard>
                </div>
                <UCard class="w-64 h-[8rem] flex items-center justify-center" @click="openModalBoard(workSpace.id)">
                    <div class="flex justify-center items-center gap-3">
                        <UIcon name="i-heroicons-plus-circle-16-solid" dynamic />
                        <p class="text-xl">Criar novo quadro</p>
                    </div>
                </UCard>
            </div>
        </div>
    </UContainer>
    <ModalWorkSpaceModal :is-open="isOpenWorkSpace" :close="closeModalWorkSpace" />
    <ModalBoardModal :is-open="isBoards" :workspace="selectWorkSpace" :close="closeModalBoard"/>
</template>