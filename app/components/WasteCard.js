"use client";

import React from 'react';


export default function WasteCard({ svgIcon, waste_type, quantity, bgClass  }) {
   console.log("WasteCard props:", { waste_type, quantity });
  return (
      <div
      className={"waste-card flex items-center h-20 p-4 rounded-xl hover:border-blue-500 hover:shadow-lg cursor-pointer transition"}
    >
      <div className={`waste-label flex items-center justify-center w-10 h-10 border rounded-sm rounded mr-2 ${bgClass}`}>
        {svgIcon}
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{waste_type}</h3>
        <p className="text-gray-600 truncate">{quantity} collectes</p>
      </div>
    </div>
  );
}