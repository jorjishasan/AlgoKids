"use client";
import React from 'react';

const Stats = ({ visited, shortestPath }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="stats flex space-x-8">
        <div className="stat bg-[#25262B] p-4 rounded">
          <div className="text-[#909296]">Visited Nodes</div>
          <div className="text-white text-2xl">{visited}</div>
        </div>
        <div className="stat bg-[#25262B] p-4 rounded">
          <div className="text-[#909296]">Path Length</div>
          <div className="text-white text-2xl">{shortestPath}</div>
        </div>
      </div>
    </div>
  );
};

export default Stats; 