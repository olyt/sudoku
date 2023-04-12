import React from 'react';
import HistoryButton from '../Buttons/HistoryButton';

const History: React.FC = () => {
  return (
    <div>
      <HistoryButton>back</HistoryButton>
      <HistoryButton>forward</HistoryButton>
    </div>
  );
};

export default History;
