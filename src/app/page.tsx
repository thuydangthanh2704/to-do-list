"use client";

import Image from "next/image";
import { Modal, Checkbox } from "antd";
import { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectDefault: Project = { id: "default", name: "Default", tasks: [] };
  const [projects, setProjects] = useState<Project[]>([projectDefault]);
  const [newProject, setNewProject] = useState("");
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [confirmDeleteProject, setConfirmDeleteProject] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectDefault.id);
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const [newTask, setNewTask] = useState("");
  
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleToggleTaskStatus = (taskId: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === selectedProjectId
        ? {
            ...project,
            tasks: project.tasks.map((task) =>
              task.id === taskId ? { ...task, status: !task.status } : task
            ),
          }
        : project
    );
    setProjects(updatedProjects);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === selectedProjectId
        ? {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          }
        : project
    );

    setProjects(updatedProjects);
    setConfirmingDeleteId(null);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    setProjects(updatedProjects);
  };

  const handleAddProject = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const project: Project = {
        id: crypto.randomUUID(),
        name: newProject,
        tasks: [],
      };
      setProjects([...projects, project]);
      setNewProject("");
    }
  };

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!selectedProject) return;
      const task: Task = {
        id: crypto.randomUUID(),
        name: newTask,
        status: false,
      };
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      );
      setProjects(updatedProjects);
      setNewTask("");
    }
  };

  const handleClickProject = (id: string) => {
    setSelectedProjectId(id);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-[200px] bg-emerald-900 pt-9">
        <div>
          <div className="flex h-1/2 justify-between w-[900px] ml-[300px]">
            <div className="flex justify-between items-center">
              <Image
                src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/todo-app-logo_begPyVFhCQy-.svg?updatedAt=1636031123870"
                alt=""
                className="inherit"
                width={100}
                height={100}
              />
              <button
                className="text-white rounded cursor-pointer ml-4 bg-gray-700 px-6 h-1/2 flex justify-between items-center"
                onClick={showModal}
              >
                <p>{selectedProject?.name}</p>
                <span className="ml-4">
                  <Image
                    src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/project-icon_1RFrQOmw6A.svg?updatedAt=1636031123903"
                    alt=""
                    className="inherit"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold text-amber-50">
                {currentDate}
              </p>
            </div>
          </div>
 
          <div className="flex justify-center mt-[37px]">
            <div className="min-h-[300px] bg-white shadow-2xl rounded-t-xl">
              <div className="flex justify-between rounded-t-2xl px-6 pt-5 pb-2.5">
                <div className="mr-3">
                  <p className="text-4xl font-bold">Task</p>
                </div>
                <form action="">
                  <input
                    type="text"
                    placeholder="Type to add a new task"
                    value={newTask}
                    className="shadow-2xs w-[700px] h-[40px] rounded-xs px-2 bg-[#f0f0f4]"
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleAddTask}
                  />
                </form>
              </div>
              <hr className="my-4 border-gray-300" />
              {selectedProject?.tasks.some((task) => !task.status) && (
                <>
                  <p className="text-xl font-semibold mb-2">To do</p>
                  {selectedProject.tasks
                    .filter((task) => !task.status)
                    .map((task) => (
                      <div
                        className="p-2 bg-gray-100 rounded mb-3 hover:bg-gray-200 cursor-pointer flex items-center justify-between"
                        key={task.id}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.status}
                            onChange={() => handleToggleTaskStatus(task.id)}
                          >
                            {task.name}
                          </Checkbox>
                        </div>

                        {confirmingDeleteId === task.id ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span>Are you sure?</span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-amber-50 cursor-pointer bg-red-700 p-2 rounded-xs"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmingDeleteId(null)}
                              className="text-gray-500 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingDeleteId(task.id)}
                            className="text-red-500 font-bold hover:text-red-700 cursor-pointer p-2 rounded-xl bg-amber-50"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                </>
              )}
              {selectedProject?.tasks.some((task) => task.status) && (
                <>
                  <p className="text-xl font-semibold mt-6 mb-2">Done</p>
                  {selectedProject.tasks
                    .filter((task) => task.status)
                    .map((task) => (
                      <div
                        className="p-2 bg-gray-100 rounded mb-3 hover:bg-gray-200 cursor-pointer flex items-center justify-between"
                        key={task.id}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={task.status}
                            onChange={() => handleToggleTaskStatus(task.id)}
                          >
                            {task.name}
                          </Checkbox>
                        </div>
                        {confirmingDeleteId === task.id ? (
                          <div className="flex items-center gap-2 text-sm">
                            <span>Are you sure?</span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-red-500 hover:underline"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => setConfirmingDeleteId(null)}
                              className="text-gray-500 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingDeleteId(task.id)}
                            className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div className="min-h-[500px]">
          <div className="flex mb-4">
            <p className="font-bold text-3xl mr-3">Projects</p>
            <input
              type="text"
              placeholder="New project"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              onKeyDown={handleAddProject}
              className="p-2 shadow-2xl bg-[#f0f0f4] w-[300px] rounded-xs"
            />
          </div>

          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="flex justify-between">
                <div
                  onClick={() => handleClickProject(project.id)}
                  className="p-2 bg-gray-100 rounded shadow hover:bg-gray-200 cursor-pointer"
                >
                  {project.name}
                </div>
                {confirmDeleteProject === project.id ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span>Are you sure?</span>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-amber-50 cursor-pointer bg-red-700 p-2 rounded-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteProject(null)}
                      className="text-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteProject(project.id)}
                    className="text-red-500 font-bold hover:text-red-700 cursor-pointer p-2 rounded-xl bg-amber-50"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
