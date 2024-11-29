import React from 'react';

const WordTag = ({ term, onClick }) => {
  return (
    <div
      className="border p-4 m-2 rounded-lg shadow-md flex justify-between cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-base font-semibold">#{term.termName}</h2>
    </div>
  );
};

export default WordTag;
