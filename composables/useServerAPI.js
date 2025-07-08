// composables/useServerFetch.js
import { useUserStore } from '~/stores/auth';

export const useServerAPI = async (request, opts = {}) => {
  const userStore = useUserStore();
const ComposableError = useError();
  const runtimeConfig = useRuntimeConfig();
  const BaseURL = runtimeConfig.public.apiBase;

    try {

      // Compose headers with token + any custom headers
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.getToken}`,
        ...(opts.headers || {}),
      };

      // Use useFetch to call API
      const response = await $fetch(`${BaseURL}${request}`, {
        method: opts.method || 'GET',
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        // Spread any other options you want to pass
        ...opts,
      });
        return {
          data: response.content,
        }
    } catch (err) {
      console.error('API request error:', err);
      ComposableError.handelErros(err)
      throw err;
    } finally {
    }
};
