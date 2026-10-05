import type { UseFetchOptions } from '#app';

const key = 'player-stats';

export default function useFetchPlayerStats(
  options: Omit<UseFetchOptions<PlayerStats[]>, 'key' | 'method'> = {},
) {
  return useFetchApi('/api/player-stats', { ...options, key });
}

export function refreshPlayerStats() {
  refreshNuxtData(key);
}
