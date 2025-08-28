import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useUserStore } from "./auth";
import { useToast } from "vue-toastification";
export const useOrdersStore = defineStore('Orders', () => {
    const runtimeConfig = useRuntimeConfig();
    const userStore = useUserStore();
    const ComposableError = useError();
    const BaseURL = runtimeConfig.public.apiBase;
    const toast = useToast();
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
                
            }
            else {
                loading.value = false
                Orders.value = orders.value.content;
                success.value = true
                toast.success("تم طلب الاعلان")
            }
        }

        catch (error) {
            console.log(error);
            loading.value = false
            success.value = false
        }
    }
    async function GetAllOrders(payload) {
        loading.value = true
        try {
            const { data: orders, error } = await useFetch(`${BaseURL}/Orders/GetAllAsync`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${userStore.getToken}` 
                },
            })
            if (error.value) {
                ComposableError.handelErros(error.value)
                loading.value = false;
                success.value = false
            }
            else {
                loading.value = false
                Orders.value = orders.value.content;
            }
        }

        catch (error) {
            console.log(error);
            loading.value = false
        }
    }
    async function DeleteOrder(id) {
        loading.value = true
        try {
            const { data: orders, error } = await useFetch(`${BaseURL}/Orders`, {
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${userStore.getToken}` 
                },
                method: "DELETE",
                params: {id: id}
            })
            if (error.value) {
                ComposableError.handelErros(error.value)
                loading.value = false;
                
            }
            else {
                toast.success("تم حذف الطلب")
                const index = Orders.value.findIndex(item => {
                    return item.id === id
                  })
                  if (index !== -1) {
                    Orders.value.splice(index, 1)
                    console.log('Object removed:');
                  } else {
                    console.log('Object not found');
                  }
                loading.value = false
                
            }
        }

        catch (error) {
            console.log(error);
            loading.value = false
            success.value = false
        }
    }

    return { AddNewOrders,GetAllOrders,DeleteOrder, getOrders, getLoading, getSuccess }
})