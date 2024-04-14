import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import TableLoader from "@/app/Loaders/TabelLoader";
import axios from "axios";
import ConfirmationModal from "../modals/ConfirmationModal";
import TaskDetailsModal from "../modals/TaskDetailsModal";
import {
  formatDate,
  getPriorityText,
  getPriorityVariant,
  getStatusText,
  getStatusVariant,
} from "@/utils/functions";

const TaskListTable = ({
  tasks,
  onDelete,
  setInitialTasks,
  setFilteredTasks,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskIdToEdit, setTaskIdToEdit] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleDeleteClick = (taskId) => {
    setIsEdit(false);
    setTaskIdToDelete(taskId);
    setShowConfirmation(true);
  };

  const handleEditClick = (taskId, status) => {
    setEditedTaskId(taskId);
    setEditedStatus(status);
  };

  const handleConfirmDelete = () => {
    if (taskIdToDelete) {
      onDelete(taskIdToDelete);
      setTaskIdToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelConfirmation = () => {
    setTaskIdToDelete(null);
    setShowConfirmation(false);
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

  const updateTask = async (taskId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/task/update-task/${taskId}`,
        {
          status: newStatus,
        }
      );
      setInitialTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);
      console.log("Task updated successfully:", res.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSubmit = async (taskId) => {
    try {
      await updateTask(taskId, editedStatus);
      setEditedTaskId(null);
      setEditedStatus("");
      setShowConfirmation(false);
    } catch (error) {}
  };
  const handleConfirmEdit = (taskId) => {
    setIsEdit(true);
    setTaskIdToEdit(taskId);
    setShowConfirmation(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);

  return isLoading ? (
    <TableLoader />
  ) : (
    <>
      <table className="table ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>

                <td>
                  {editedTaskId === task._id ? (
                    <select
                      className="form-control"
                      value={editedStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span
                      className={`badge badge-${getStatusVariant(task.status)}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  )}
                </td>

                <td>
                  <span
                    className={`badge badge-${getPriorityVariant(
                      task.priority
                    )}`}
                  >
                    {getPriorityText(task.priority)}
                  </span>
                </td>
                <td>{formatDate(task.startDate)}</td>
                <td>{formatDate(task.endDate)}</td>
                <td>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    <AiOutlineDelete />
                  </button>

                  {editedTaskId === task._id ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleConfirmEdit(task._id, task.status)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(task._id, task.status)}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className=" mr-2"
                    onClick={() => handleTaskClick(task)}
                  >
                    <AiOutlineInfoCircle
                      size={20}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ConfirmationModal
        show={showConfirmation}
        onCancel={handleCancelConfirmation}
        onConfirmDelete={handleConfirmDelete}
        onConfirmEdit={handleConfirmEdit}
        isEdit={isEdit}
        handleSubmit={handleSubmit}
        taskIdToEdit={taskIdToEdit}
      />
      <TaskDetailsModal
        handleSubmit={handleSubmit}
        task={selectedTask}
        show={selectedTask !== null}
        onDelete={handleDeleteClick}
        onHide={handleCloseModal}
      />
    </>
  );
};

export default TaskListTable;
