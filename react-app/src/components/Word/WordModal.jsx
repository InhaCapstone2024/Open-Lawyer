import React from 'react';

const WordModal = ({ isOpen, term, onClose }) => {
  if (!isOpen || !term) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{term.termName}</h2>
          <button
            onClick={onClose}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            x
          </button>
        </div>
        <p className="mt-4 text-gray-700">{term.description}</p>
      </div>
    </div>
  );
};

export default WordModal;
