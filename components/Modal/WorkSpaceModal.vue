<script lang="ts" setup>
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import { useWorkSpaceStore } from '#imports';

const workSpacesStore = useWorkSpaceStore();

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    close: {
        type: Function,
        required: true
    }
})

const types = [
    { label: 'Operações', value: { icon: 'i-carbon-operations-record', value: 1 } },
    { label: 'Marketing', value: { icon: 'i-nimbus-marketing', value: 2 } },
    { label: 'CRM de vendas', value: { icon: 'i-carbon-id-management', value: 3 } },
    { label: 'Engenharia/TI', value: { icon: 'i-material-symbols-developer-mode-tv-outline', value: 4 } },
    { label: 'Pequena empresa', value: { icon: 'i-majesticons-table', value: 5 } },
    { label: 'Recursos Humanos', value: { icon: 'i-material-symbols-diversity-3', value: 6 } },
    { label: 'Educação', value: { icon: 'i-carbon-education', value: 7 } },
    { label: 'Outro', value: { icon: 'i-teenyicons-grid-layout-outline', value: 8 } }
];

const state = reactive({
    name: undefined,
    type: undefined,
    description: undefined
});

const schema = z.object({
    name: z.string().min(10),
    type: z.any(),
    description: z.string().min(10),
});

type Schema = z.infer<typeof schema>

const form = ref()

let open = computed(() => {
    return props.isOpen
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { name, type, description } = event.data;
    workSpacesStore.addWorkSpace(name, type.value, description)
    props.close();
}

</script>

<template>
    <UModal v-model="open">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-center">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Vamos criar uma Área de trabalho
                    </h3>
                </div>
            </template>

            <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
                <UFormGroup name="input" label="Nome da Área de trabalho">
                    <UInput v-model="state.name" placeholder="Digite um nome..." />
                </UFormGroup>

                <UFormGroup name="inputMenu" label="Tipo de área de trabalho">
                    <UInputMenu v-model="state.type" :options="types" placeholder="Selecione..." />
                </UFormGroup>

                <UFormGroup name="textarea" label="Descrição da Área de trabalho" hint="Optional">
                    <UTextarea v-model="state.description" placeholder="Organizar a equipe..." />
                </UFormGroup>
                <div class="flex justify-center">
                    <UButton class="w-40 flex justify-center" variant="solid" color="white" type="submit">Continuar
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </UModal>
</template>
