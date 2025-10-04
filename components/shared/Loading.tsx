import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-6">
      <div className="mt-4 text-center">
        <div className="flex justify-center space-x-1">
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;