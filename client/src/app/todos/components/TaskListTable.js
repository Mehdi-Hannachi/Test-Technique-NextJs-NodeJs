import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import TableLoader from "@/app/Loaders/TabelLoader";
import axios from "axios";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

const TaskListTable = ({
  tasks,
  onDelete,
  setInitialTasks,
  setFilteredTasks,
}) => {
  const [isLoading, setIsloading] = useState(true);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");

  const handleEditClick = (taskId, status) => {
    setEditedTaskId(taskId);
    setEditedStatus(status);
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    console.log(taskId);
    setTaskIdToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (taskIdToDelete) {
      onDelete(taskIdToDelete);
      setTaskIdToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskIdToDelete(null);
    setShowDeleteConfirmation(false);
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
    } catch (error) {}
  };

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
  };
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "";
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "";
    }
  };
  return isLoading ? (
    <TableLoader />
  ) : (
    <>
      <table className="table">
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
                      onClick={() => handleSubmit(task._id)}
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
              </tr>
            ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default TaskListTable;
