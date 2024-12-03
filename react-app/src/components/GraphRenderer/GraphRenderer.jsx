import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphRenderer = ({ probability }) => {
  const pieData = {
    labels: ['승소 확률', '패소 확률'],
    datasets: [
      {
        data: [probability, 100 - probability],
        backgroundColor: ['#5A85DA', '#EF4444'],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <p>예상 승소 확률은 {probability}%입니다.</p>
      <div className="w-56 h-56">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default GraphRenderer;
