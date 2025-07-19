import {defineStore} from 'pinia'

export const useStatisticStore = defineStore('Statistic', () => {
    const statistics = ref({
        content: {},
        loading: false
    })

    async function GetStatistic() {
        statistics.value.loading = true;
        try {
            const {data} = await useServerAPI('/Statistic');
            if (data) {
                statistics.value.content = data
            }
        } catch (error) {
            
        }
        finally {
            statistics.value.loading = false
        }
    }
    
    async function EditStatistic() {
        statistics.value.loading = true;
        statistics.value.content.id = 1
        try {
            const {data} = await useServerAPI('/Statistic', {
                method: "PUT",
                body: JSON.stringify(statistics.value.content)
            });
            if (data) {
                statistics.value.content = data
            }
        } catch (error) {
            
        }
        finally {
            statistics.value.loading = false
        }
    }
    return {
        statistics,
        GetStatistic,
        EditStatistic
    }
})