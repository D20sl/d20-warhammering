<script setup lang="ts">
const model = defineModel<number>({ required: true });

// URadioGroup turns plain number items into strings, but keeps an object item's value as it is.
const items = BUDGETS.map((budget) => ({
  label: String(budget),
  value: budget,
}));
</script>

<template>
  <UFormField label="Punti partita" name="budget" required>
    <URadioGroup
      v-model="model"
      :items
      variant="table"
      orientation="horizontal"
      indicator="hidden"
      size="sm"
      :ui="{ item: 'cursor-pointer' }"
    />
  </UFormField>
</template>
