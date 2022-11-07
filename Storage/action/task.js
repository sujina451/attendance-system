export const Addtask = (data) => {
  return {
    type: "ADDTASK",
    data: data,
  };
};
export const Edittask = (data) => {
  return {
    type: "UPDATETASK",
    data: data,
  };
};

export const Deletetask = () => {
  return {
    type: "DELETETASK",
    data: null,
  };
};
