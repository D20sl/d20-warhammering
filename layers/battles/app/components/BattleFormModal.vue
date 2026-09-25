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

const labels = computed(() =>
  isEditMode.value
    ? {
        player1Faction: 'Fazione giocatore 1',
        player1Points: 'Punti giocatore 1',
        player2: 'Giocatore 2',
        player2Faction: 'Fazione giocatore 2',
        player2Points: 'Punti giocatore 2',
      }
    : {
        player1Faction: 'Tua fazione',
        player1Points: 'Quanti punti hai fatto?',
        player2: 'Avversario',
        player2Faction: 'Fazione avversario',
        player2Points: "Quanti punti ha fatto l'avversario?",
      },
);

const { user } = useUserSession();

const { data: seasons } = useFetchApi('/api/seasons', {
  query: { showAll: isEditMode.value },
});

function getDefaultState(): NewBattle {
  if (props.battle) return { ...props.battle };
  return {
    budget: 1000,
    date: today(getLocalTimeZone()).toString(),

    season: seasons.value?.length === 1 ? seasons.value[0]!.name : undefined,

    player1: user.value!.displayName,
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

  if (!isEditMode.value) assumeFactionForPlayer(1)(state.value.player1);
}

const ALL_FORM_STEPS = ['common', 'season', 'player1', 'player2'];
type FormStep = (typeof ALL_FORM_STEPS)[number];

const formSteps = computed(() =>
  seasons.value?.length
    ? ALL_FORM_STEPS
    : ALL_FORM_STEPS.filter((s) => s !== 'season'),
);

const STEP_FIELDS: Record<FormStep, Exclude<keyof NewBattle, 'id'>[]> = {
  common: ['date', 'budget'],
  season: ['season'],
  player1: ['player1', 'player1Faction', 'player1Points'],
  player2: ['player2', 'player2Faction', 'player2Points'],
};

const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<NewBattle>) {
  loading.value = true;

  const { success } = await fetchApi(
    isEditMode.value
      ? `/api/admin/battles/${props.battle!.id}`
      : '/api/battles',
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

const { data: playerStats } = useFetchPlayerStats();

const players = computed(() => playerStats.value?.map((s) => s.player) ?? []);

function playersExcept(name: string) {
  return players.value.filter((p) => p !== name);
}

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
    :steps="formSteps"
    :step-fields="STEP_FIELDS"
    :loading
    :disabled="!isEditMode && !consentGiven"
    @submit="onSubmit"
    @open="resetForm"
  >
    <slot />

    <template #fields="{ step }">
      <template v-if="step === 'common'">
        <UFormField label="Data partita" name="date" required>
          <InputDate v-model="date" autofocus />
        </UFormField>
        <BattleBudgetField v-model="state.budget" />
      </template>

      <BattleSeasonField
        v-else-if="step === 'season'"
        v-model="state.season"
        :seasons
      />

      <template v-else-if="step === 'player1'">
        <UFormField
          v-if="isEditMode"
          label="Giocatore 1"
          name="player1"
          required
        >
          <USelectMenu
            v-model="state.player1"
            :items="playersExcept(state.player2)"
            autofocus
            class="w-50"
          />
        </UFormField>
        <UFormField
          :label="labels.player1Faction"
          name="player1Faction"
          required
        >
          <USelectMenu
            v-model="state.player1Faction"
            :items="FACTIONS"
            :autofocus="!isEditMode"
            class="w-50"
          />
        </UFormField>
        <UFormField :label="labels.player1Points" name="player1Points" required>
          <UInputNumber v-model="state.player1Points" class="w-50" />
        </UFormField>
      </template>

      <template v-else>
        <UFormField :label="labels.player2" name="player2" required>
          <USelectMenu
            v-model="state.player2"
            :items="playersExcept(state.player1)"
            autofocus
            class="w-50"
          />
        </UFormField>
        <UFormField
          :label="labels.player2Faction"
          name="player2Faction"
          required
        >
          <USelectMenu
            v-model="state.player2Faction"
            :items="FACTIONS"
            class="w-50"
          />
        </UFormField>
        <UFormField :label="labels.player2Points" name="player2Points" required>
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
