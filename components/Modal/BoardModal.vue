<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { useWorkSpaceStore } from '#imports';

const workSpacesStore = useWorkSpaceStore();

const selectedColor = ref(1)

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    workspace: {
        type: String,
        required: true
    },
    close: {
        type: Function,
        required: true
    }
});

const options = [
    { id: 1, color: 'bg-blue-500'},
    { id: 2, color: 'bg-green-500'},
    { id: 3, color: 'bg-red-500'},
    { id: 4, color: 'bg-orange-500'}
]

const state = reactive({
    name: undefined,
    color: undefined
});

const schema = z.object({
    name: z.string().min(10),
    color: z.any(),
});

type Schema = z.infer<typeof schema>

const form = ref()

let open = computed(() => {
    return props.isOpen
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { name } = event.data;
    const color = selectedColor.value;
    const workSpaceId = props.workspace;
    workSpacesStore.addBoardToWorkSpace(workSpaceId, name, color.toString())
    props.close();
}

</script>

<template>
    <UModal v-model="open">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Criar Quadro 
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="props.close()" />
                </div>
            </template>

            <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup name="radio" label="Escolha uma cor">
                    <div class="flex items-center justify-center gap-3 mb-3 mt-3">
                        <div v-for="option in options" >
                            <div :class="[option.color, option.id == selectedColor? 'rounded-full border-4  border-zinc-200 h-[40px] w-[40px] ': 'rounded-full h-[35px] w-[35px]']" @click="selectedColor = option.id"></div>
                        </div> 
                    </div>
                </UFormGroup>
                <UFormGroup name="input" label="Nome do Quadro">
                    <UInput v-model="state.name" placeholder="Digite um nome..." />
                </UFormGroup>
                <div class="flex justify-center">
                    <UButton class="w-40 flex justify-center" variant="solid" color="white" type="submit">Continuar
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>