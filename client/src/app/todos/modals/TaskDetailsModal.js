import { FaPaperclip } from "react-icons/fa";
import {
  calculateDuration,
  formatDate,
  getPriorityText,
  getPriorityVariant,
  getStatusText,
  getStatusVariant,
} from "@/utils/functions";

const TaskDetailsModal = ({ show, task, onHide }) => {
  return (
    task && (
      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none", zIndex: "1" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={onHide}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Status:
                    <span
                      className={`badge badge-${getStatusVariant(task.status)}`}
                    >
                      {getStatusText(task.status)}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Priority:
                    <span
                      className={`badge badge-${getPriorityVariant(
                        task.priority
                      )}`}
                    >
                      {getPriorityText(task.priority)}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Start Date: {formatDate(task.startDate)}
                  </li>
                  <li className="list-group-item">
                    End Date: {formatDate(task.endDate)}
                  </li>
                  <li className="list-group-item">
                    Duration: {calculateDuration(task)} days
                  </li>
                </ul>

                <div className="input-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add attachment..."
                  />
                  <button className="btn border">
                    <FaPaperclip />
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={onHide}
                >
                  Close
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskDetailsModal;
