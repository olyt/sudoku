import React, { MouseEventHandler } from 'react';
import HistoryButton from '../Buttons/HistoryButton';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import {
  EDirection,
  tryToGoThroughHistory,
} from '../../context/history/operations';

const HistoryWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 15%;
  margin: auto;
  display: flex;
  align-items: center;
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
      <HistoryButton error={history.goBackError} onClick={handleGoBack}>
        back
      </HistoryButton>
      <HistoryButton error={history.goForwardError} onClick={handleGoForward}>
        forward
      </HistoryButton>
    </HistoryWrapper>
  );
};

export default History;
