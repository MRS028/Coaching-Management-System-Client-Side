import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex space-x-2">
        <span className="w-5 h-5 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-5 h-5 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-5 h-5 rounded-full bg-blue-500 animate-bounce"></span>
        <span className="w-5 h-5 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.15s]"></span>
        <span className="w-5 h-5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.3s]"></span>
      </div>
    </div>
  );
};

export default Loading;
