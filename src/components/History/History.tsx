import React, { MouseEventHandler, useState } from 'react';
import HistoryButton from '../Buttons/HistoryButton';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { tryGoBack, tryGoForward } from '../../context/history/operations';

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
  const [disabled, setDisabled] = useState<boolean>(false);
  const { dispatch, history } = useAppContext();

  const handleGoBack: MouseEventHandler<HTMLButtonElement> = () => {
    setDisabled(true);
    dispatch(tryGoBack());
    setDisabled(false);
  };

  return (
    <HistoryWrapper>
      <HistoryButton
        error={history.error}
        disabled={disabled}
        onClick={handleGoBack}
      >
        back
      </HistoryButton>
      <HistoryButton
        error={history.error}
        onClick={() => dispatch(tryGoForward())}
      >
        forward
      </HistoryButton>
    </HistoryWrapper>
  );
};

export default History;
