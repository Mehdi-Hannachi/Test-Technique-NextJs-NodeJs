import { useState, useEffect } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import AddTaskModal from "./modals/AddTaskModal";
import TaskListTable from "./components/TaskListTable";
import axios from "axios";

const TodoList = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [initialTasks, setInitialTasks] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/task/get-tasks");
        setTasks(res.data.tasks);
        setLoading(false);
        setFilteredTasks(res.data.tasks);
        setInitialTasks(res.data.tasks);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status === statusFilter ? "" : status);
    filterTasks(
      status === statusFilter ? "" : status,
      priorityFilter,
      searchTerm
    );
  };

  const handlePriorityFilterChange = (priority) => {
    setPriorityFilter(priority === priorityFilter ? "" : priority);
    filterTasks(
      statusFilter,
      priority === priorityFilter ? "" : priority,
      searchTerm
    );
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    filterTasks(statusFilter, priorityFilter, searchValue);
  };

  const filterTasks = (status, priority, searchTerm) => {
    let filtered = initialTasks.slice(); // Copie des tâches initiales

    // Filtrer par statut
    if (status !== "") {
      filtered = filtered.filter((task) => task.status === status);
    }

    // Filtrer par priorité
    if (priority !== "") {
      filtered = filtered.filter((task) => task.priority === priority);
    }

    // Filtrer par recherche de titre ou de description
    if (searchTerm !== "") {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  /*  ************ delete Task api calling *********************** */

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/task/delete-task/${taskId}`
      );
      setInitialTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);

      return res.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      return null;
    }
  };

  /*  ************ Add Task api calling *********************** */

  const handleAddTask = async (newTask) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/task/add-task",
        newTask
      );
      setInitialTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);
      setShowAddModal(false);
      return res.data;
    } catch (error) {
      console.error("Error adding task:", error);
      return null;
    }
  };

  return (
    <div>
      <main>
        <div className="container text-center"></div>
        {/* Filter Section and Add Task Button */}
        <div className="container mt-4">
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col-md-4">
              <div className="btn-group" role="group">
                <button
                  className={`btn btn-secondary ${
                    statusFilter === "" ? "active" : ""
                  }`}
                  onClick={() => handleStatusFilterChange("")}
                >
                  All Status
                </button>
                <button
                  className={`btn btn-secondary ${
                    statusFilter === "pending" ? "active" : ""
                  }`}
                  onClick={() => handleStatusFilterChange("pending")}
                >
                  Pending
                </button>
                <button
                  className={`btn btn-secondary ${
                    statusFilter === "in-progress" ? "active" : ""
                  }`}
                  onClick={() => handleStatusFilterChange("in-progress")}
                >
                  In Progress
                </button>
                <button
                  className={`btn btn-secondary ${
                    statusFilter === "completed" ? "active" : ""
                  }`}
                  onClick={() => handleStatusFilterChange("completed")}
                >
                  Completed
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="btn-group" role="group">
                <button
                  className={`btn btn-secondary ${
                    priorityFilter === "" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityFilterChange("")}
                >
                  All Priority
                </button>
                <button
                  className={`btn btn-secondary ${
                    priorityFilter === "high" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityFilterChange("high")}
                >
                  High
                </button>
                <button
                  className={`btn btn-secondary ${
                    priorityFilter === "medium" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityFilterChange("medium")}
                >
                  Medium
                </button>
                <button
                  className={`btn btn-secondary ${
                    priorityFilter === "low" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityFilterChange("low")}
                >
                  Low
                </button>
              </div>
            </div>
            <div className="col-md-4 text-md-right">
              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Task List Table */}
        <div className="container table-border mt-4">
          {filteredTasks && filteredTasks.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                <AiOutlineWarning size={50} style={{ marginBottom: 10 }} />
                <p>Empty</p>
              </div>
            </div>
          ) : (
            <TaskListTable
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              setInitialTasks={setInitialTasks}
              setFilteredTasks={setFilteredTasks}
            />
          )}
        </div>

        {/* Add Task Modal */}
        <AddTaskModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTask}
        />
      </main>
    </div>
  );
};

export default TodoList;
