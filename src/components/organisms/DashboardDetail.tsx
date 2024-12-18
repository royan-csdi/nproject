import { Suspense } from "react";
import {
  Project,
  Task,
  Notification,
  TaskStatus,
  ProjectStatus,
  IUser,
} from "@/interfaces";
import { Sidebar } from "@/app/(protected)/dashboard/_components/Sidebar";
import { Header } from "@/app/(protected)/dashboard/_components/Header";
import { TaskList } from "@/app/(protected)/dashboard/_components/TaskList";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SidebarFetcher from "./SidebarFetcher";
import { SidebarSkeleton } from "../molecules/SidebarSkeleton";
import TaskSkeleton from "../molecules/TaskSkeleton";
import { getQueryClient } from "@/lib/get-query-client";
import { taskProjectQueries } from "@/services/queries/task.queries";

type Props = {
  user: IUser;
  projectId: string;
};

export default async function DashboardDetail({ user, projectId }: Props) {
  //   const markNotificationAsRead = (notificationId: number): void => {
  //     setNotifications(notifications.map(notification =>
  //       notification.id === notificationId ? { ...notification, isRead: true } : notification
  //     ))
  //   }

  //   const markAllNotificationsAsRead = (): void => {
  //     setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  //   }

  return (
    <div className="flex h-screen bg-gray-100">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar user={user} />
      </Suspense>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Suspense fallback={<TaskSkeleton />}>
            <TaskList projectId={projectId} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
