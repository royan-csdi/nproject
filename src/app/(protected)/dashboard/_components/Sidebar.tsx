"use client";
import { CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IUser, Project, ProjectRequest } from "@/interfaces";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  projectQueries,
  // useCreateProjectMutation
} from "@/services/queries/project.queries";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { getUserSession } from "@/lib/session";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createProject } from "@/services/fetcher/project.fetcher";

interface SidebarProps {
  //   projects: Project[];
  //   selectedProject: Project | null;
  //   setSelectedProject: (project: Project) => void;
  //   newProjectTitle: string;
  //   setNewProjectTitle: (title: string) => void;
  //   addProject: () => void;
  user?: IUser;
}

const statusProjects = ["IN_PROGRESS", "COMPLETED", "TODO"];

export function Sidebar({ user }: SidebarProps) {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(projectQueries());
  console.log("[SIDEBAR]: ", data);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: ProjectRequest) => createProject(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setNewProjectTitle("");
      setNewProjectDesc("");
      setnewStatus("");
      setDate(undefined);
      setOpen(false);
    },
    onError: (error: any) => {
      setOpen(false);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setNewProjectTitle("");
      setNewProjectDesc("");
      setnewStatus("");
      setDate(undefined);
    },
  });
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>(data.data || []);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState<string>("");
  const [newProjectDesc, setNewProjectDesc] = useState<string>("");
  const [newStatus, setnewStatus] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();

  const [open, setOpen] = useState(false);

  const addProject = async (): Promise<void> => {
    if (newProjectTitle) {
      const newProject: ProjectRequest = {
        title: newProjectTitle,
        status: "IN_PROGRESS",
        description: newProjectDesc,
        deadline: date,
        ownerId: user?.id || "",
      };

      try {
        mutateAsync(newProject);
      } catch (error) {
        console.log("DISINI:", error);
      }
    }
  };

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Project Manager</h1>
        <nav className="space-y-2">
          {projects.map((project: Project) => (
            <Link
              href={`/dashboard/${project.id}`}
              key={project.id}
              className={`block w-full text-left p-2 rounded ${
                selectedProject?.id === project.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {project.title}
            </Link>
          ))}
        </nav>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-4 border-2" variant={"outline"}>
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <Label htmlFor="taskTitle">Project Title</Label>
            <Input
              value={newProjectTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProjectTitle(e.target.value)
              }
              placeholder="Project Title"
            />
            <Label htmlFor="description">Description</Label>
            <Input
              value={newProjectDesc}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewProjectDesc(e.target.value)
              }
              placeholder="description"
            />
            <Label htmlFor="taskAssignee">Status</Label>
            <Select value={newStatus} onValueChange={setnewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statusProjects.map((status, index) => (
                  <SelectItem key={index} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? date.toDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <DialogFooter>
              <Button onClick={addProject} disabled={isPending}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
