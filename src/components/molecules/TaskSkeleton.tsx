import React from "react";

const TaskSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col h-full animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-1/4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2 overflow-auto flex-grow">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-full mb-2"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <div className="ml-2 h-4 w-1/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col h-full animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-1/4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2 overflow-auto flex-grow">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-full mb-2"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <div className="ml-2 h-4 w-1/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex flex-col h-full animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 w-1/4 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="space-y-2 overflow-auto flex-grow">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-4 w-1/2 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-full mb-2"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                  <div className="ml-2 h-4 w-1/4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
