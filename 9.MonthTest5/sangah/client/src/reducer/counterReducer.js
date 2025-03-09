export const counterReducer = (state, action) => {
  switch (action) {
    case "INCREMENT":
      return state.count + 1;
    case "DECREMENT":
      return state.count - 1;
    case "RESET":
      return 0;
    default:
      return;
  }
};
