import type { UseFetchOptions } from '#app';

export default function useFetchPlayerStats(
  options: Omit<UseFetchOptions<PlayerStats[]>, 'key' | 'method'> = {},
) {
  return useFetchApi('/api/player-stats', { ...options, key: 'player-stats' });
}
