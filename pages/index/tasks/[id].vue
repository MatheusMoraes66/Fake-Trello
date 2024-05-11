<script setup lang="ts">
    import { useBoardStore } from '../../../stores/boardStore';
    import { useRoute } from 'vue-router';
import { computed } from 'vue';

    const boardStore = useBoardStore();
    const route = useRoute();

    const task = computed(() => {
        return boardStore.getTask(route.params.id);
    })
</script>

<template>
    <div class="task-wrapper">
        <div class="task.view">
            <h1>{{ task.name }}</h1>
            <p>{{ task.description }}</p>
        </div>
    </div>
</template>