<script setup lang="ts" generic="TSchema, TStep extends string">
import type {
  FormEmits,
  FormErrorEvent,
  FormProps,
  FormSubmitEvent,
  InferInput,
  InferOutput,
  ModalProps,
} from '@nuxt/ui';

const props = defineProps<
  Pick<ModalProps, 'title' | 'description' | 'fullscreen'> &
    Pick<FormProps<TSchema>, 'state' | 'schema'> & {
      steps?: TStep[];
      stepFields?: Record<TStep, (keyof InferInput<TSchema>)[]>;

      loading?: boolean;
      disabled?: boolean;

      modalUi?: ModalProps['ui'];
      formUi?: FormProps<TSchema>['ui'];
    }
>();

const emit = defineEmits<
  FormEmits<TSchema> & {
    open: [];
    close: [];
  }
>();

const open = defineModel<boolean>({ default: undefined });

function onOpenUpdate(o: boolean) {
  if (!o) {
    emit('close');
    return;
  }

  emit('open');
  step.value = props.steps?.[0];
}

const uForm = useTemplateRef('uForm');

const step = ref(props.steps?.[0]) as Ref<TStep | undefined>;

function prevStep() {
  if (!props.steps || !step.value) return;

  uForm.value?.clear();

  step.value = props.steps[props.steps.indexOf(step.value) - 1]!;
}

async function nextStep() {
  if (!props.steps || !props.stepFields || !step.value) return;

  try {
    await uForm.value?.validate({ name: props.stepFields[step.value] });
  } catch {
    return;
  }

  step.value = props.steps[props.steps.indexOf(step.value) + 1]!;
}

function onSubmit(event: FormSubmitEvent<InferOutput<TSchema>>) {
  emit('submit', event);
}

function onError(event: FormErrorEvent) {
  console.error(
    'Form error event',
    ...event.errors.map((err) => `\n[${err.name}] ${err.message}`),
  );

  emit('error', event);
}

const modalUi = useMergedSlotClasses(props.modalUi, {
  header: 'border-b-accented',
  content: 'h-full',
  body: 'p-0!',
});
</script>

<template>
  <UModal
    :title
    :description
    :ui="modalUi"
    :open="open"
    :fullscreen
    @update:open="onOpenUpdate"
  >
    <slot />

    <template #body>
      <UForm
        ref="uForm"
        :state
        :schema
        :ui="formUi"
        class="h-full grid grid-cols-1 grid-rows-[1fr_auto]"
        @submit="onSubmit"
        @error="onError"
      >
        <div
          class="flex flex-col gap-4 border-b border-b-accented overflow-auto p-4 sm:p-6"
        >
          <slot name="fields" :step />
        </div>

        <div class="flex justify-end gap-2 p-4 sm:p-6">
          <UButton
            v-if="steps && step !== steps[0]"
            color="dark"
            :icon="AppIcons.ARROW_LEFT"
            @click="prevStep"
          >
            Indietro
          </UButton>

          <UButton
            v-if="!steps || step === steps.at(-1)"
            type="submit"
            :trailing-icon="AppIcons.UPLOAD"
            :loading
            :disabled
          >
            Invia
          </UButton>
          <UButton
            v-else
            color="dark"
            :trailing-icon="AppIcons.ARROW_RIGHT"
            @click="nextStep"
          >
            Avanti
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
