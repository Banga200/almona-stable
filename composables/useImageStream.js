export const useImageStream = (id) => {
    const runtimeConfig = useRuntimeConfig();
    const BaseURL = runtimeConfig.public.apiBase;

    return `${BaseURL}/Files/GetFileStreamById?id=${id}`
}