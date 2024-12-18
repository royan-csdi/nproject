"use client";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Task, TaskStatus } from "@/interfaces";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { taskProjectQueries } from "@/services/queries/task.queries";

interface TaskListProps {
  tasks: Task[];
  selectedProjectId: string | null;
  editingTask: Task | null;
  newTaskTitle: string;
  newTaskDescription: string;
  newTaskAssignee: string;
  teamMembers: string[];
  setNewTaskTitle: (title: string) => void;
  setNewTaskDescription: (description: string) => void;
  setNewTaskAssignee: (assignee: string) => void;
  setEditingTask: (task: Task | null) => void;
  addTask: () => void;
  updateTask: () => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  reorderTasks: (tasks: Task[]) => void;
}

type Props = {
  // user: IUser;
  projectId: string;
};

export function TaskList({ projectId }: Props) {
  const { data } = useSuspenseQuery(taskProjectQueries(projectId));
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design Homepage",
      description: "Create a new homepage design",
      status: "In Progress" as TaskStatus,
      projectId: "1",
      assignee: "John Doe",
      order: 0,
    },
    {
      id: "2",
      title: "Implement User Authentication",
      description: "Set up user login and registration",
      status: "Todo" as TaskStatus,
      projectId: "1",
      assignee: "Jane Smith",
      order: 1000,
    },
    {
      id: "3",
      title: "Create App Wireframes",
      description: "Design initial app screens",
      status: "In Progress" as TaskStatus,
      projectId: "2",
      assignee: "Alice Johnson",
      order: 2000,
    },
    {
      id: "4",
      title: "Set Up Test Environment",
      description: "Configure testing framework",
      status: "Completed" as TaskStatus,
      projectId: "3",
      assignee: "Bob Wilson",
      order: 3000,
    },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Mock team members (in a real app, this would come from an API)
  const teamMembers: string[] = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Wilson",
  ];

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

  const addTask = (): void => {
    if (newTaskTitle) {
      const maxOrder = Math.max(...tasks.map((task) => task.order), -1);
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
        status: "Todo" as TaskStatus,
        projectId: "asdasd",
        assignee: newTaskAssignee,
        order: maxOrder + 1000,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskAssignee("");
    }
  };

  const updateTask = (): void => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: newTaskTitle,
                description: newTaskDescription,
                assignee: newTaskAssignee,
              }
            : task
        )
      );
      setEditingTask(null);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskAssignee("");
    }
  };

  const deleteTask = (taskId: string): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };
  const reorderTasks = (newTasks: Task[]): void => {
    setTasks(newTasks);
  };

  //   const filteredTasks = tasks
  //     .filter(task => !selectedProjectId || task.projectId === selectedProjectId)
  //     .sort((a, b) => a.order - b.order);

  const columns: { [key in TaskStatus]: Task[] } = {
    Todo: tasks.filter((task) => task.status === "Todo"),
    "In Progress": tasks.filter((task) => task.status === "In Progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const sourceColumn = source.droppableId as TaskStatus;
    const destinationColumn = destination.droppableId as TaskStatus;
    const draggedTask = tasks.find((task) => task.id === draggableId);

    if (!draggedTask) return;

    // Create arrays of tasks for the affected columns
    const sourceTasks = columns[sourceColumn];
    const destinationTasks =
      sourceColumn === destinationColumn
        ? sourceTasks
        : columns[destinationColumn];

    // Remove task from source
    const newSourceTasks = [...sourceTasks];
    newSourceTasks.splice(source.index, 1);

    // Add task to destination
    const newDestinationTasks =
      sourceColumn === destinationColumn
        ? newSourceTasks
        : [...destinationTasks];

    const newTask = {
      ...draggedTask,
      status: destinationColumn,
    };

    newDestinationTasks.splice(destination.index, 0, newTask);

    // Calculate new orders
    const updatedTasks = tasks.map((task) => {
      // If task is in affected columns, update its order
      if (task.status === sourceColumn || task.status === destinationColumn) {
        const columnTasks =
          task.status === sourceColumn ? newSourceTasks : newDestinationTasks;
        const taskIndex = columnTasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          return {
            ...task,
            order: taskIndex * 1000,
          };
        }
      }
      return task;
    });

    // Update the dragged task's status and order
    const finalTasks = updatedTasks.map((task) =>
      task.id === draggableId
        ? {
            ...task,
            status: destinationColumn,
            order: destination.index * 1000,
          }
        : task
    );

    reorderTasks(finalTasks);
  };

  return (
    <div className="h-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button onClick={() => setEditingTask({} as Task)} className="mt-4">
          <Plus className="h-4 w-4 mr-2" /> Add New Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-12rem)] overflow-hidden">
          {Object.entries(columns).map(([status, statusTasks]) => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-gray-50 rounded-lg p-4 flex flex-col h-full ${
                    snapshot.isDraggingOver ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700">{status}</h3>
                    <Badge
                      variant={status === "Completed" ? "default" : "secondary"}
                    >
                      {statusTasks.length}
                    </Badge>
                  </div>
                  <div className="space-y-2 overflow-auto flex-grow">
                    {statusTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white ${
                              snapshot.isDragging
                                ? "shadow-lg ring-2 ring-primary"
                                : ""
                            }`}
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{task.title}</h4>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <span className="sr-only">Open menu</span>
                                      <svg
                                        className="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onSelect={() => setEditingTask(task)}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onSelect={() => deleteTask(task.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <p className="text-sm text-gray-500 mb-2">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                                    {task.assignee
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                  <span className="ml-2 text-sm text-gray-600">
                                    {task.assignee}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <Dialog
        open={editingTask !== null}
        onOpenChange={() => setEditingTask(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? "Edit Task" : "Add New Task"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTaskTitle(e.target.value)
                }
                placeholder="Enter task title"
              />
            </div>
            <div>
              <Label htmlFor="taskDescription">Task Description</Label>
              <Textarea
                id="taskDescription"
                value={newTaskDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewTaskDescription(e.target.value)
                }
                placeholder="Enter task description"
              />
            </div>
            <div>
              <Label htmlFor="taskAssignee">Assignee</Label>
              <Select
                value={newTaskAssignee}
                onValueChange={setNewTaskAssignee}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={editingTask ? updateTask : addTask}>
              {editingTask ? "Update Task" : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
