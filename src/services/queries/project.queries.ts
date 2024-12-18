
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProject, getAllProject } from "../fetcher/project.fetcher";
import { ProjectRequest } from "@/interfaces";

export const projectQueries = () => {
  return {
    queryKey: ["projects"],
    queryFn: getAllProject,
  };
};

// export const projectByIdQueries = (id: string) => {
//     return {
//         queryKey: ['projects', id],
//         queryFn: () => getAllProject(id)
//     }
// }

// export const useCreateProjectMutation = () => {
//     return useMutation({
//         mutationKey: ['projects'],
//         mutationFn: (body: ProjectRequest) => createProject(body)
//     })
// }
