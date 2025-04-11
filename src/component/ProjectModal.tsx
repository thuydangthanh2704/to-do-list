import { Modal } from "antd";

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

interface ProjectModalProps {
  isOpen: boolean;
  onCancel: () => void;
  projects: Project[];
  newProject: string;
  setNewProject: (val: string) => void;
  handleAddProject: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickProject: (id: string) => void;
  confirmDeleteProject: string | null;
  setConfirmDeleteProject: (val: string | null) => void;
  handleDeleteProject: (id: string) => void;
}

export default function ProjectModal({
  isOpen,
  onCancel,
  projects,
  newProject,
  setNewProject,
  handleAddProject,
  handleClickProject,
  confirmDeleteProject,
  setConfirmDeleteProject,
  handleDeleteProject,
}: ProjectModalProps) {
  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null}>
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

        <div className="">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border-b border-gray-200"
            >
              {confirmDeleteProject === project.id &&
              confirmDeleteProject !== "default" ? (
                <div className="flex justify-between items-center p-2 rounded">
                  <span>{project.name}</span>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Are you sure?</span>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-white bg-red-700 px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteProject(null)}
                      className="text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>{" "}
                </div>
              ) : (
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer rounded">
                  <div
                    className="w-full"
                    onClick={() => handleClickProject(project.id)}
                  >
                    {project.name}
                  </div>
                  <button
                    onClick={() => setConfirmDeleteProject(project.id)}
                    className="text-red-500 font-bold rounded hidden group-hover:inline cursor-pointer"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
