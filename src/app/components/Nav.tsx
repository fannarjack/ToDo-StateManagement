"use client";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext, ThemeProps } from "./ThemeProvider";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeProps;
  return (
    <>
      <div
        className={`flex justify-between items-center p-4 sticky top-0 bg-gray-50 ${theme === "dark" ? "bg-gray-950 text-white" : ""} `}
      >
        <div>
          <span>Logo</span>
        </div>
        <div>
          <ul className=" py-2 px-4  space-x-10">
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Contact</Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`border rounded py-2 px-4 ${theme === "light" ? "" : "bg-black text-white"}`}
            >
              {theme === "dark" ? "Dark" : "Light"}
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
