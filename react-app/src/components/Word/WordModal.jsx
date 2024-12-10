const WordModal = ({ isOpen, term, onClose }) => {
  if (!isOpen || !term) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 1002 }} // tailwindcss z-index 제한으로 명시 필요
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md sm:max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{term.termName}</h2>
          <button
            onClick={onClose}
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            x
          </button>
        </div>
        {/* 스크롤 가능한 용어 뜻 섹션 */}
        <div
          className="mt-4 text-gray-700 max-h-96 overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: term.description }}
        />
      </div>
    </div>
  );
};

export default WordModal;
