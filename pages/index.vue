<script setup lang="ts">
import { useBoardStore } from '~/stores/boardStore';

const boardStore = useBoardStore();

</script>

<template>
    <h1>Clone Trello</h1>
    <pre>{{ boardStore.board }}</pre>
</template>