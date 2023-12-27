import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useUserStore } from "./auth";
export const useOrdersStore = defineStore('Orders', () => {
    const runtimeConfig = useRuntimeConfig();
    const userStore = useUserStore();
    const ComposableError = useError();
    const BaseURL = runtimeConfig.public.apiBase;
    // States 
    const Orders = ref([]);
    const loading = ref(false);
    const success = ref(false);
    // Getters 
    const getOrders = computed(() => { return Orders.value })
    const getLoading = computed(() => { return loading.value })
    const getSuccess = computed(() => { return success.value })

    // Actions 
    async function AddNewOrders(payload) {
        loading.value = true
        try {
            const { data: orders, error } = await useFetch(`${BaseURL}/Orders`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${userStore.getToken}` 
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            console.log(error)
            if (error.value) {
                ComposableError.handelErros(error.value)
                loading.value = false;
                success.value = false
            }
            else {
                loading.value = false
                Orders.value = orders.value.content;
                success.value = true
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return { AddNewOrders, getOrders, getLoading, getSuccess }
})