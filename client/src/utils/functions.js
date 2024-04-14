export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};

export const getStatusText = (status) => {
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

export const getStatusVariant = (status) => {
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

export const getPriorityText = (priority) => {
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

export const getPriorityVariant = (priority) => {
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

export const calculateDuration = (task) => {
  const startDate = new Date(task.startDate);
  const endDate = new Date(task.endDate);
  const durationInMilliseconds = endDate - startDate;
  const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
  return durationInDays.toFixed(2);
};
