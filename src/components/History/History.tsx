import React from 'react';
import HistoryButton from '../Buttons/HistoryButton';
import styled from 'styled-components';

const HistoryWrapper = styled.div`
  height: 100px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 15%;
  margin: auto;
  display: flex;
  gap: 10px;
`;

const History: React.FC = () => {
  return (
    <HistoryWrapper>
      <HistoryButton>back</HistoryButton>
      <HistoryButton>forward</HistoryButton>
    </HistoryWrapper>
  );
};

export default History;
