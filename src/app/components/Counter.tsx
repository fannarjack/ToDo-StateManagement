"use client";

import { useReducer, useContext } from "react";
import { reducerFunction, initialState, ACTIONS } from "../utils/reducer";
import { ThemeProps, ThemeContext } from "./ThemeProvider";

const Counter = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);
  const { theme } = useContext(ThemeContext) as ThemeProps;
  return (
    <div
      className={` flex justify-center bg-gray-50 py-24 ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}
    >
      <div
        className={`flex flex-col items-center gap-6 justify-center text-center rounded p-12 w-1/4
          ${theme === "dark" ? "bg-gray-900 border-2 border-black" : "bg-white"}`}
      >
        <p>{state.count}</p>
        <div className="flex gap-4 ">
          <button
            onClick={() => {
              dispatch({ type: ACTIONS.DECREASE });
            }}
            className="border-2 rounded py-2 px-4"
          >
            -
          </button>
          <button
            onClick={() => {
              dispatch({ type: ACTIONS.RESET });
            }}
            className="border-2 rounded py-2 px-4"
          >
            Reset
          </button>
          <button
            onClick={() => {
              dispatch({ type: ACTIONS.INCREASE });
            }}
            className="border-2 rounded py-2 px-4"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
