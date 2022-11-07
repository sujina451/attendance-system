function TaskReducer(state = null, action) {
  switch (action.type) {
    case "ADDTASK":
      return action.data.task;
    case "UPDATETASK":
      return action.data.task;
    case "DELETETASK":
      return null;
    default:
      return state;
  }
}

export default TaskReducer;
