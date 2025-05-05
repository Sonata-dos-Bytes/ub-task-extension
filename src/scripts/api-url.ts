export const ApiUrl = (params: string) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}${params}`

    return url
}