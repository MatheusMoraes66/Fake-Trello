<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core';
import { useRouter } from 'vue-router';
const colorMode = useColorMode();

const router = useRouter();

const emit = defineEmits(['childEvent']);

const keys = useMagicKeys();

const CtrlK = keys['Ctrl+K'];
const CmdK = keys['CMD+K'];

watch(CtrlK, (v) => {
  if (v)
  emitOpenModal()
})
watch(CmdK, (v) => {
  if (v)
  emitOpenModal()
})

function changeTheme() {
    if (colorMode.value === 'dark') {
        colorMode.preference = 'light';
    } else {
        colorMode.preference = 'dark';
    }
}
function emitOpenModal() {
    emit('childEvent');
}
</script>

<template>
    <div class="w-full h-16 flex max-md:justify-between justify-around p-2 border-b-2 border-neutral-500">
        <div class=" flex items-center justify-start w-2/12 cursor-default " @click="router.push('/')">
            <img src="~/assets/images/logo.svg" alt="Logo" width="50" />
            <h2 class="font-mono font-bold">Trello</h2>
        </div>
        <div class=" flex items-center justify-center w-4/12 max-md:hidden">
            <UButton @click="emitOpenModal" icon="i-heroicons-magnifying-glass-20-solid" block
                 variant="solid" color="white">Pesquise... <UKbd>⌘ + K</UKbd>
            </UButton>
        </div>
        <div class=" flex items-center justify-end w-2/12">
            <UButton :icon="colorMode.value == 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" color="white" @click="changeTheme">
            </UButton>
        </div>
    </div>
</template>