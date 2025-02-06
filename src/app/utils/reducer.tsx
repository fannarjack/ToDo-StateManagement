type initialState = {
  count: number;
};

const ACTIONS = {
  INCREASE: "increment",
  DECREASE: "decrement",
  RESET: "reset",
};

const initialState: initialState = {
  count: 0,
};
const reducerFunction = (state: initialState, action: { type: string }) => {
  switch (action.type) {
    case ACTIONS.INCREASE:
      return { count: state.count + 1 };
    case ACTIONS.RESET:
      return { count: (state.count = 0) };
    case ACTIONS.DECREASE:
      return { count: state.count > 0 ? state.count - 1 : 0 };
    default:
      return state;
  }
};

export { reducerFunction, initialState, ACTIONS };
