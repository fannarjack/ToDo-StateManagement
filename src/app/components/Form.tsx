"use client";
import { useState, useReducer, FormEvent, useRef, useContext } from "react";
import { ThemeProps, ThemeContext } from "./ThemeProvider";

type ListItem = {
  id: string;
  value: string;
};

type InitialType = {
  list: ListItem[];
  changeInput: boolean;
};

const initial: InitialType = {
  list: [],
  changeInput: false,
};

type ActionType = {
  ADD: string;
  DELETE: string;
  UPDATE: string;
};

const ACTIONS: ActionType = {
  ADD: "add",
  DELETE: "delete",
  UPDATE: "update",
};

const listReducer = (
  state: InitialType,
  action: {
    type: string;
    payload?: string;
    id?: string;
  },
) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        list: [...state.list, { id: action.id, value: action.payload }],
      };
    case ACTIONS.DELETE:
      return { ...state, list: state.list.filter((l) => l.id !== action.id) };
    case ACTIONS.UPDATE:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.id ? { ...item, value: action.payload } : item,
        ),
      };
    default:
      return state;
  }
};

const Form = () => {
  const [current, setCurrent] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(listReducer, initial);
  const { theme } = useContext(ThemeContext) as ThemeProps;

  function handleClick(e: FormEvent) {
    e.preventDefault();
    if (editId) {
      dispatch({ type: ACTIONS.UPDATE, payload: current, id: editId });
      setEditId(null);
    } else {
      const id = Date.now().toString();
      dispatch({ type: ACTIONS.ADD, payload: current, id: id });
    }
    setCurrent("");
  }

  function handleDelete(id: string) {
    dispatch({ type: ACTIONS.DELETE, id: id });
  }

  function handleEdit(id: string, value: string) {
    setCurrent(value);
    setEditId(id);
    inputRef.current?.focus();
  }

  return (
    <div
      data-theme={theme}
      className={`flex items-center justify-center h-screen w-full bg-gray-50
        ${theme === "dark" ? "bg-gray-950 text-white" : ""}`}
    >
      <div className="flex flex-col justify-center items-center h-full w-1/2 gap-5">
        <form
          className={`flex flex-col gap-6 justify-center rounded items-center w-1/2 h-56 ${theme === "dark" ? "bg-gray-900 border-2 border-black" : "bg-white"}`}
          onSubmit={handleClick}
        >
          <label>To Do List</label>
          <input
            ref={inputRef}
            required
            className={`border-2 rounded p-2 ${theme === "dark" ? "text-black" : ""}`}
            placeholder="Add a ToDo"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <button className="border-2 rounded py-2 px-4" type="submit">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        {state.list.length > 0 && (
          <div
            className={`flex flex-col  rounded  items-center w-1/2 gap-4 p-4 ${theme === "dark" ? "bg-gray-900 border-2 border-black " : "bg-white"}`}
          >
            {state.list.map((e, index) => (
              <div
                className="flex justify-between w-full items-center gap-4"
                key={index}
              >
                <p>{e.value}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(e.id, e.value)}
                    className="border-2 rounded py-2 px-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="border-2 rounded py-2 px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Form;
