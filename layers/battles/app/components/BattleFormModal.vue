<script setup lang="ts">
import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui';
import InputDate from '~/components/InputDate.vue';

const props = defineProps<{
  battle?: Battle;
}>();

const emit = defineEmits<{
  submit: [];
}>();

const isEditMode = computed(() => !!props.battle?.id);

function getDefaultState(): NewBattle {
  if (props.battle) return { ...props.battle };
  return {
    budget: 1000,
    date: today(getLocalTimeZone()).toString(),

    player1: '',
    player1Points: 0,
    player1Faction: '',

    player2: '',
    player2Points: 0,
    player2Faction: '',
  };
}

const state = ref(getDefaultState());

const date = computed<CalendarDate>({
  get: () => parseDate(state.value.date),
  set: (val) => (state.value.date = val.toString()),
});

const toast = useToast();
const open = ref(false);

const consentGiven = ref(false);

function resetForm() {
  state.value = getDefaultState();
  consentGiven.value = false;
}

const FORM_STEPS = ['common', 'player1', 'player2'];
type FormStep = (typeof FORM_STEPS)[number];

const STEP_FIELDS: Record<FormStep, Exclude<keyof NewBattle, 'id'>[]> = {
  common: ['date', 'budget'],
  player1: ['player1', 'player1Faction', 'player1Points'],
  player2: ['player2', 'player2Faction', 'player2Points'],
};

const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<NewBattle>) {
  loading.value = true;

  const { success } = await fetchApi(
    '/api/battles' + (isEditMode.value ? `/${props.battle!.id}` : ''),
    {
      method: isEditMode.value ? 'PUT' : 'POST',
      body: event.data,
    },
  );

  loading.value = false;

  if (!success) return;

  toast.add({
    title: 'Partita registrata',
    color: 'success',
  });

  open.value = false;

  emit('submit');
}

const { data: playerStats } = useFetchApi('/api/player-stats');
const { data: seasons } = useFetchApi('/api/seasons');

const season = useNullAsUndefined(state, 'season');

const players = computed(() => playerStats.value?.map((s) => s.player));

function assumeFactionForPlayer(player: 1 | 2) {
  return (name: string) => {
    const playerStat = playerStats.value?.find((p) => p.player === name);
    const faction = playerStat?.factions[0];

    if (!faction) return;

    state.value[`player${player}Faction`] = faction.name;
  };
}

watch(() => state.value.player1, assumeFactionForPlayer(1));
watch(() => state.value.player2, assumeFactionForPlayer(2));
</script>

<template>
  <FormModal
    v-model:open="open"
    title="Registra partita"
    :description="`La partita verrà ${isEditMode ? 'modificata nel' : 'aggiunta al'} database`"
    :schema="battleSchema"
    :state
    :steps="FORM_STEPS"
    :step-fields="STEP_FIELDS"
    :loading
    :disabled="!isEditMode && !consentGiven"
    :modal-ui="{ content: 'h-125' }"
    @submit="onSubmit"
    @open="resetForm"
  >
    <slot />

    <template #fields="{ step }">
      <template v-if="step === 'common'">
        <UFormField label="Data partita" name="date" required>
          <InputDate v-model="date" autofocus />
        </UFormField>
        <UFormField label="Punti partita" name="budget" required>
          <USelect v-model="state.budget" :items="BUDGETS" class="w-50" />
        </UFormField>
        <UFormField label="Stagione" name="season">
          <USelectMenu
            v-model="season"
            :items="seasons"
            label-key="name"
            value-key="name"
            :filter-fields="['name', 'description']"
            class="w-50"
          />
        </UFormField>
      </template>

      <template v-else-if="step === 'player1'">
        <UFormField label="Tuo nome" name="player1" required>
          <BattleFormPlayerNameInput v-model="state.player1" :players />
        </UFormField>
        <UFormField label="Tua fazione" name="player1Faction" required>
          <USelectMenu
            v-model="state.player1Faction"
            :items="FACTIONS"
            class="w-50"
          />
        </UFormField>
        <UFormField label="Quanti punti hai fatto?" name="player1Points">
          <UInputNumber v-model="state.player1Points" class="w-50" />
        </UFormField>
      </template>

      <template v-else>
        <UFormField label="Nome avversario" name="player2" required>
          <BattleFormPlayerNameInput v-model="state.player2" :players />
        </UFormField>
        <UFormField label="Fazione avversario" name="player2Faction" required>
          <USelectMenu
            v-model="state.player2Faction"
            :items="FACTIONS"
            class="w-50"
          />
        </UFormField>
        <UFormField
          label="Quanti punti ha fatto l'avversario?"
          name="player2Points"
        >
          <UInputNumber v-model="state.player2Points" class="w-50" />
        </UFormField>

        <UCheckbox
          v-if="!isEditMode"
          v-model="consentGiven"
          class="mt-2"
          required
        >
          <template #label>
            Ho letto la
            <ULink to="/privacy" target="_blank">privacy policy</ULink>
            e ho il consenso del giocatore avversario al trattamento dei suoi
            dati per la registrazione della partita.
          </template>
        </UCheckbox>
      </template>
    </template>
  </FormModal>
</template>
