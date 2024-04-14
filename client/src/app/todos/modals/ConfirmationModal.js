const ConfirmationModal = ({
  isEdit,
  show,
  taskIdToEdit,
  onCancel,
  onConfirmDelete,
  handleSubmit,
}) => {
  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none", zIndex: "1" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Confirm update" : "Confirm Deletion"}
            </h5>
            <button type="button" className="close" onClick={onCancel}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {isEdit
              ? `Are you sure to edit this item?`
              : `Are you sure to delete this item?`}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={isEdit ? "btn btn-primary" : "btn btn-danger"}
              onClick={
                isEdit ? () => handleSubmit(taskIdToEdit) : onConfirmDelete
              }
            >
              {isEdit ? "Edit" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
