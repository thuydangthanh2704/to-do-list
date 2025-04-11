"use client";
import { useState } from "react";
import Header from "@/component/Headers";
import TaskList from "@/component/TaskList";
import ProjectModal from "@/component/ProjectModal";
interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  name: string;
  status: boolean;
}

export default function Home() {
  const projectDefault: Project = { id: "default", name: "Default", tasks: [] };
  const [projects, setProjects] = useState<Project[]>([projectDefault]);
  const [selectedProjectId, setSelectedProjectId] = useState(projectDefault.id);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState<string | null>(null);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleAddProject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newProj: Project = {
        id: crypto.randomUUID(),
        name: newProject,
        tasks: [],
      };
      setProjects([...projects, newProj]);
      setNewProject("");
    }
  };

  const handleClickProject = (id: string) => {
    setSelectedProjectId(id);
    setIsModalOpen(false);
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedProject) {
      const task: Task = {
        id: crypto.randomUUID(),
        name: newTask,
        status: false,
      };
      const updatedProjects = projects.map((proj) =>
        proj.id === selectedProject.id
          ? { ...proj, tasks: [...proj.tasks, task] }
          : proj
      );
      setProjects(updatedProjects);
      setNewTask("");
    }
  };

  const handleToggleTaskStatus = (taskId: string) => {
    const updated = projects.map((proj) =>
      proj.id === selectedProjectId
        ? {
            ...proj,
            tasks: proj.tasks.map((t) =>
              t.id === taskId ? { ...t, status: !t.status } : t
            ),
          }
        : proj
    );
    setProjects(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = projects.map((proj) =>
      proj.id === selectedProjectId
        ? { ...proj, tasks: proj.tasks.filter((t) => t.id !== taskId) }
        : proj
    );
    setProjects(updated);
    setConfirmingDeleteId(null);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  return (
    <div className="w-full">
      <Header
        selectedProjectName={selectedProject?.name ?? ""}
        showModal={showModal}
        currentDate={currentDate}
      />
      <div className="flex justify-center mt-[37px] w-full">
        <TaskList
          tasks={selectedProject?.tasks ?? []}
          newTask={newTask}
          setNewTask={setNewTask}
          handleAddTask={handleAddTask}
          handleToggleTaskStatus={handleToggleTaskStatus}
          handleDeleteTask={handleDeleteTask}
          confirmingDeleteId={confirmingDeleteId}
          setConfirmingDeleteId={setConfirmingDeleteId}
        />
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        projects={projects}
        newProject={newProject}
        setNewProject={setNewProject}
        handleAddProject={handleAddProject}
        handleClickProject={handleClickProject}
        confirmDeleteProject={confirmDeleteProject}
        setConfirmDeleteProject={setConfirmDeleteProject}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
}
