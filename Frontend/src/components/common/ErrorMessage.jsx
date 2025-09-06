import React from 'react';

const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;
  
  const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';
  
  return (
    <div className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 ${className}`} role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{errorMessage}</span>
    </div>
  );
};

export default ErrorMessage;