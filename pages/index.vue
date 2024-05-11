<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore';

const boardStore = useBoardStore();

const newColumnName = ref('')

function addColumn() {
    boardStore.addColumn(newColumnName.value)
    newColumnName.value = ''
}

</script>

<template>
    <div class="board-wrapper">
        <main class="board">
            <BoardColumn
                v-for="(column, columnIndex) in boardStore.board.columns" 
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
    </div>
</template>