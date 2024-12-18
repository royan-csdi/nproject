"use server";
import { ProjectRequest } from "@/interfaces";
import satellite from "../satellite";

export const getAllProject = async () => {
  return satellite({
    method: "GET",
    url: "projects",
  });
};

export const getAllProjectById = async (id: string) => {
  return satellite({
    method: "GET",
    url: `projects/all-projects/${id}`,
  });
};

export const createProject = async (body: ProjectRequest) => {
  try {
    const response = await satellite({
      method: "POST",
      url: "projects",
      data: body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
