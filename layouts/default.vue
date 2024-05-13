<script setup lang="ts">
const isOpen = ref(false);

const people = [
  { id: 1, label: 'Wade Cooper' },
]

const selected = ref([]);
</script>

<template>
    <div>
        <AppHeader @child-event="isOpen = !isOpen" />
        <div>
            <slot />
        </div>
        <UModal v-model="isOpen">
            <UCommandPalette v-model="selected" multiple nullable :groups="[{ key: 'people', commands: people }]" />
        </UModal>
    </div>
</template>