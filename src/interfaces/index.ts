
export interface ILoginPayloadRequest {
    email: string;
    password: string;
}

export interface ILoginPayloadResponse {
    user: IUser;
    token: string;
    refreshToken: string;
}

export interface IUser{
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IRegisterPayloadRequest {
    email: string;
    password: string;
    name: string;
}

export interface IAPIBaseResponse<T>{
    status: string;
    message: string;
    data: T
}


export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';
export type ProjectStatus = "PLANNING" | "IN_PROGRESS" | "COMPLETED";


export interface Project {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string;
  userProjects?: UserProjects[];
}

export interface ProjectRequest {
    title: string;
    description: string;
    deadline: Date | undefined;
    status: ProjectStatus;
    ownerId: string;
}

interface UserProjects {
  id: string;
  userId: string;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assignee: string;
  order: number;
}

export interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}
