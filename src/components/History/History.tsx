import React, { MouseEventHandler } from 'react';
import HistoryButton from '../Buttons/HistoryButton';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import {
  EDirection,
  tryToGoThroughHistory,
} from '../../context/history/operations';

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
  const { dispatch, history } = useAppContext();

  const handleGoBack: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(tryToGoThroughHistory(EDirection.Back));
  };

  const handleGoForward: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(tryToGoThroughHistory(EDirection.Forward));
  };

  return (
    <HistoryWrapper>
      <HistoryButton error={history.error} onClick={handleGoBack}>
        back
      </HistoryButton>
      <HistoryButton error={history.error} onClick={handleGoForward}>
        forward
      </HistoryButton>
    </HistoryWrapper>
  );
};

export default History;
