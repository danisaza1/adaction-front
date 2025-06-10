"use client";


import { Button } from "./button";

function Waste({ emoji, label, quantity, onDecrease, onIncrease, onChange }) {
  return (
    <div className="flex flex-row gap-5 items-center justify-between">
      <Button className="border border-gray-200 w-44 text-left bg-opacity-0 text-grey hover:bg-transparent justify-start items-center">
        {" "}
        {emoji} {label}
      </Button>
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={onDecrease}
          className="p-1 rounded-full bg-transparent text-black cursor-pointer hover:bg-gray-100"
        >
          {" "}
          -{" "}
        </Button>
        <input
          min="0"
          max=""
          value={quantity}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
          className="!w-20 text-center cursor-pointer"
        />
        <Button
          onClick={onIncrease}
          className="p-1 rounded-full bg-transparent text-black cursor-pointer hover:bg-gray-100"
        >
          {" "}
          +{" "}
        </Button>
      </div>
    </div>
  );
}

export { Waste };
