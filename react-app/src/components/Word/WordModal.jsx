import React from 'react';

const WordModal = ({ isOpen, term, onClose }) => {
  if (!isOpen || !term) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="w-320 max-w-sm max-h-450 bg-white p-6 rounded-lg shadow-lg
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{term.termName}</h2>
          <button
            onClick={onClose}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            x
          </button>
        </div>
        <div
          className="mt-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: term.description }}
        />
      </div>
    </div>
  );
};

export default WordModal;
