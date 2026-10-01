<script setup lang="ts">
import d20Logo from '~/assets/img/d20.webp';
import warhammerLogo from '~/assets/img/wh.webp';

defineProps<{
  small?: boolean;
}>();

useHead({
  link: [
    { rel: 'preload', as: 'image', href: d20Logo },
    { rel: 'preload', as: 'image', href: warhammerLogo },
  ],
});

const { loggedIn } = useUserSession();
</script>

<template>
  <header>
    <NuxtLink
      to="/"
      :external="!loggedIn"
      class="flex flex-col justify-center items-center"
      :class="small ? 'w-30 md:w-50' : 'w-70'"
    >
      <img :src="d20Logo" />
      <img :src="warhammerLogo" />
    </NuxtLink>
  </header>
</template>
