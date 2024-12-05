import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLegalTerms, fetchLegalTermById } from '../../apis/term';
import WordTag from '../../components/Word/WordTag';
import WordModal from '../../components/Word/WordModal';

const Dictionary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const itemsPerPage = 30; // 페이지당 표시할 단어 수

  const {
    data: terms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['legalTerms'],
    queryFn: fetchLegalTerms,
  });

  const openModal = async (id) => {
    try {
      const term = await fetchLegalTermById(id);
      setSelectedTerm(term);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching term by ID:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTerm(null);
  };

  // 페이지네이션: 페이지 데이터 분할 관리
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTerms = terms.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(terms.length / itemsPerPage);

  if (isLoading) return <p className="text-center">로딩 중...</p>;
  if (isError)
    return <p className="text-center">데이터를 가져오는 데 실패했습니다.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">법률 용어 사전</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 pr-4">
        {currentTerms.map((term) => (
          <WordTag
            key={term.id}
            term={{ termName: term.name, id: term.id }}
            onClick={() => openModal(term.id)}
          />
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded mx-2 hover:bg-gray-400 transition duration-200"
        >
          이전
        </button>
        <span className="px-4 py-2 text-black">{`페이지 ${currentPage} / ${totalPages}`}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2 hover:bg-blue-600 transition duration-200"
        >
          다음
        </button>
      </div>

      <WordModal isOpen={modalOpen} term={selectedTerm} onClose={closeModal} />
    </div>
  );
};

export default Dictionary;
