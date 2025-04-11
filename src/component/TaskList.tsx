import { Checkbox } from "antd";

interface Task {
  id: string;
  name: string;
  status: boolean;
}

interface TaskListProps {
  tasks: Task[];
  newTask: string;
  setNewTask: (val: string) => void;
  handleAddTask: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleToggleTaskStatus: (id: string) => void;
  handleDeleteTask: (id: string) => void;
  confirmingDeleteId: string | null;
  setConfirmingDeleteId: (val: string | null) => void;
}

export default function TaskList({
  tasks,
  newTask,
  setNewTask,
  handleAddTask,
  handleToggleTaskStatus,
  handleDeleteTask,
  confirmingDeleteId,
  setConfirmingDeleteId,
}: TaskListProps) {
  return (
    <div className="min-h-[300px] bg-white shadow-2xl rounded-t-xl w-full lg:w-[1000px] mt-[-133px]">
      <div className="flex justify-between rounded-t-2xl px-6 pt-5 pb-2.5">
        <p className="text-4xl font-bold">Task</p>
        <input
          type="text"
          placeholder="Type to add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleAddTask}
          className="shadow-2xs w-[800px] h-[50px] rounded-xs px-2 bg-[#f0f0f4]"
        />
      </div>
      <hr className="my-4 border-gray-300" />

      {tasks.some((t) => !t.status) && (
        <>
          <p className="text-sx mt-4 mb-2 px-6 text-[#7b7b9d]">to do</p>
          {tasks
            .filter((t) => !t.status)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isConfirming={confirmingDeleteId === task.id}
                onToggle={() => handleToggleTaskStatus(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onConfirmDelete={() => setConfirmingDeleteId(task.id)}
                onCancelDelete={() => setConfirmingDeleteId(null)}
              />
            ))}
        </>
      )}

      {tasks.some((t) => t.status) && (
        <>
          <p className="text-sx text-[#7b7b9d] mt-4 mb-2 px-6">done</p>
          {tasks
            .filter((t) => t.status)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isConfirming={confirmingDeleteId === task.id}
                onToggle={() => handleToggleTaskStatus(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onConfirmDelete={() => setConfirmingDeleteId(task.id)}
                onCancelDelete={() => setConfirmingDeleteId(null)}
              />
            ))}
        </>
      )}
    </div>
  );
}

function TaskItem({
  task,
  isConfirming,
  onToggle,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
}: {
  task: Task;
  isConfirming: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}) {
  return (
    <div className="p-2 rounded mb-3 hover:bg-gray-200 cursor-pointer flex items-center justify-between mx-6 group">
      <div className="flex items-center">
        <Checkbox checked={task.status} onChange={onToggle}>
          <p>{ task.name}</p>
        </Checkbox>
      </div>
      {isConfirming ? (
        <div className="flex items-center gap-2 text-sm">
          <span>Are you sure?</span>
          <button onClick={onDelete} className="text-red-500 hover:underline">
            Delete
          </button>
          <button
            onClick={onCancelDelete}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={onConfirmDelete}
          className="text-red-500 font-bold cursor-pointer hidden group-hover:inline"
        >
          X
        </button>
      )}
    </div>
  );
}

