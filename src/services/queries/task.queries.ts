import { getTaskByProjectId } from "../fetcher/task.fetcher"

export const taskProjectQueries = (id: string) => {
    return {
        queryKey: ['tasks', id],
        queryFn: () => getTaskByProjectId(id)
    }
}