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
import { getQueryClient } from "@/lib/get-query-client";
import { projectQueries } from "@/services/queries/project.queries";

type Props = {
  user: IUser;
};

export default function Dashboard({ user }: Props) {
  //   const [tasks, setTasks] = useState<Task[]>([
  //     { id: '1', title: 'Design Homepage', description: 'Create a new homepage design', status: 'In Progress' as TaskStatus, projectId: '1', assignee: 'John Doe', order: 0 },
  //     { id: '2', title: 'Implement User Authentication', description: 'Set up user login and registration', status: 'Todo' as TaskStatus, projectId: '1', assignee: 'Jane Smith', order: 1000 },
  //     { id: '3', title: 'Create App Wireframes', description: 'Design initial app screens', status: 'In Progress' as TaskStatus, projectId: '2', assignee: 'Alice Johnson', order: 2000 },
  //     { id: '4', title: 'Set Up Test Environment', description: 'Configure testing framework', status: 'Completed' as TaskStatus, projectId: '3', assignee: 'Bob Wilson', order: 3000 },
  //   ])
  //   const [notifications, setNotifications] = useState<Notification[]>([])
  //   const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  //   const [newTaskDescription, setNewTaskDescription] = useState<string>('')
  //   const [newTaskAssignee, setNewTaskAssignee] = useState<string>('')
  //   const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Mock team members (in a real app, this would come from an API)
  //   const teamMembers: string[] = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson']

  // Simulating real-time notifications
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const newNotification: Notification = {
  //         id: Date.now(),
  //         message: `New update on ${projects[Math.floor(Math.random() * projects.length)].title}`,
  //         isRead: false,
  //       }
  //       setNotifications(prev => [newNotification, ...prev].slice(0, 5))
  //     }, 10000)

  //     return () => clearInterval(interval)
  //   }, [projects])

  //   const addTask = (): void => {
  //     if (newTaskTitle) {
  //       const maxOrder = Math.max(...tasks.map(task => task.order), -1);
  //       const newTask: Task = {
  //         id: Date.now().toString(),
  //         title: newTaskTitle,
  //         description: newTaskDescription,
  //         status: 'Todo' as TaskStatus,
  //         projectId: 'asdasd',
  //         assignee: newTaskAssignee,
  //         order: maxOrder + 1000,
  //       }
  //       setTasks([...tasks, newTask])
  //       setNewTaskTitle('')
  //       setNewTaskDescription('')
  //       setNewTaskAssignee('')
  //     }
  //   }

  //   const updateTask = (): void => {
  //     if (editingTask) {
  //       setTasks(tasks.map(task =>
  //         task.id === editingTask.id
  //           ? { ...task, title: newTaskTitle, description: newTaskDescription, assignee: newTaskAssignee }
  //           : task
  //       ))
  //       setEditingTask(null)
  //       setNewTaskTitle('')
  //       setNewTaskDescription('')
  //       setNewTaskAssignee('')
  //     }
  //   }

  //   const deleteTask = (taskId: string): void => {
  //     setTasks(tasks.filter(task => task.id !== taskId))
  //   }

  //   const updateTaskStatus = (taskId: string, newStatus: TaskStatus): void => {
  //     setTasks(tasks.map(task =>
  //       task.id === taskId ? { ...task, status: newStatus } : task
  //     ))
  //   }

  //   const markNotificationAsRead = (notificationId: number): void => {
  //     setNotifications(notifications.map(notification =>
  //       notification.id === notificationId ? { ...notification, isRead: true } : notification
  //     ))
  //   }

  //   const markAllNotificationsAsRead = (): void => {
  //     setNotifications(notifications.map(notification => ({ ...notification, isRead: true })))
  //   }

  //   const reorderTasks = (newTasks: Task[]): void => {
  //     setTasks(newTasks);
  //   }

  return (
    <div className="flex h-screen bg-gray-100">
      <Suspense fallback={<SidebarSkeleton/>}>
          <Sidebar user={user}/>
      </Suspense>
      {/* <Sidebar
        projects={dataProject}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        newProjectTitle={newProjectTitle}
        setNewProjectTitle={setNewProjectTitle}
        addProject={addProject}
      /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
        //   notifications={notifications}
        //   markNotificationAsRead={markNotificationAsRead}
        //   markAllNotificationsAsRead={markAllNotificationsAsRead}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Welcome to your dashboard! Here you can manage your projects and
                tasks.
              </CardDescription>
            </CardHeader>
          </Card>
          {/* <TaskList
            tasks={tasks}
            selectedProjectId={selectedProject?.id || null}
            editingTask={editingTask}
            newTaskTitle={newTaskTitle}
            newTaskDescription={newTaskDescription}
            newTaskAssignee={newTaskAssignee}
            teamMembers={teamMembers}
            setNewTaskTitle={setNewTaskTitle}
            setNewTaskDescription={setNewTaskDescription}
            setNewTaskAssignee={setNewTaskAssignee}
            setEditingTask={setEditingTask}
            addTask={addTask}
            updateTask={updateTask}
            deleteTask={deleteTask}
            updateTaskStatus={updateTaskStatus}
            reorderTasks={reorderTasks}
          /> */}
        </main>
      </div>
    </div>
  );
}
