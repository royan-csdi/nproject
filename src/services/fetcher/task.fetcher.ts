import satellite from "../satellite";

export const getTaskByProjectId = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return satellite({
    method: "GET",
    url: `tasks/project/${id}`,
  });
};
