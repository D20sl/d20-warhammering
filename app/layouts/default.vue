<script setup lang="ts">
defineProps<{ isHome?: boolean }>();

const { loggedIn, user } = useUserSession();

const route = useRoute();

defineShortcuts({
  'meta_<': () => navigateTo('/admin'),
});
</script>

<template>
  <UContainer
    class="h-svh flex flex-col items-center gap-4 pt-4 pb-10"
    :class="{ 'justify-center': isHome }"
  >
    <HeaderLogos :small="!isHome" />

    <div class="flex gap-2">
      <UButton
        v-if="!isHome"
        to="/"
        size="sm"
        :icon="AppIcons.HOME"
        color="dark"
      >
        Home
      </UButton>

      <UButton
        v-if="isAdmin(user) && route.path !== '/admin'"
        to="/admin"
        size="sm"
        :icon="AppIcons.SETTINGS"
        color="dark"
      >
        Dashboard
      </UButton>

      <UButton
        v-if="loggedIn"
        :to="logoutUrl()"
        size="sm"
        :icon="AppIcons.LOCK_OPEN"
        color="dark"
        external
      >
        Logout
      </UButton>

      <UButton
        v-else
        :to="loginUrl(route.fullPath)"
        size="sm"
        :icon="AppIcons.USER"
        color="dark"
        external
      >
        Login
      </UButton>
    </div>

    <slot />

    <footer class="fixed bottom-2">
      <NuxtLink to="/privacy" class="text-xs text-muted hover:underline">
        Privacy Policy
      </NuxtLink>
    </footer>
  </UContainer>
</template>
