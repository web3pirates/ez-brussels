import { Button } from "./atoms";
import React from "react";

export const menuButtonStyle =
  "inline-block text-gray-900 bg-white border-0 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-lg min-w-24 p-4 font-bold text-center cursor-pointer transition-colors duration-300 ease-in-out whitespace-nowrap relative";

export const NavigationMenu = () => {
  const [selectedButton, setSelectedButton] = React.useState("Home");

  return (
    <div className="flex justify-between items-center mb-3 mt-3">
      <div className="flex gap-2">
        <button
          className={menuButtonStyle}
          onClick={() => {
            setSelectedButton("Home");
            window.location.href = "/";
          }}
        >
          Home
          <span className="block h-1 w-full bg-gray-900 transition-opacity duration-300 opacity-0 hover:opacity-100" />
        </button>
        <button
          className={menuButtonStyle}
          onClick={() => {
            setSelectedButton("Positions");
            window.location.href = "/positions";
          }}
        >
          Positions
          <span className="block h-1 w-full bg-gray-900 transition-opacity duration-300 opacity-0 hover:opacity-100" />
        </button>
        <button
          className={menuButtonStyle}
          onClick={() => {
            setSelectedButton("Transactions");
            window.location.href = "/transactions";
          }}
        >
          Transactions
          <span className="block h-1 w-full bg-gray-900 transition-opacity duration-300 opacity-0 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
};
