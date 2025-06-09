export const ApiUrl = (params: string) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "https://ub-task-api.gmvo90.easypanel.host"
    const url = `${baseUrl}${params}`

    return url
}