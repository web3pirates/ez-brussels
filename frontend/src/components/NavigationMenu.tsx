import { Button } from "./atoms";
import React from "react";

export const NavigationMenu = () => {
  const [selectedButton, setSelectedButton] = React.useState("Home");

  return (
    <div className="flex justify-between items-center mt-5">
      <div className="flex gap-2">
        <Button
          className={selectedButton === "Home" ? "bg-blue-700" : ""}
          onClick={() => {
            setSelectedButton("Home");
            window.location.href = "/";
          }}
        >
          Home
        </Button>
        <Button
          className={selectedButton === "Positions" ? "bg-blue-700" : ""}
          onClick={() => {
            setSelectedButton("Positions");
            window.location.href = "/positions";
          }}
        >
          Positions
        </Button>
        <Button
          className={selectedButton === "Transactions" ? "bg-blue-700" : ""}
          onClick={() => {
            setSelectedButton("Transactions");
            window.location.href = "/transactions";
          }}
        >
          Transactions
        </Button>
      </div>
    </div>
  );
};
