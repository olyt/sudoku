import React from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../../utils/buttonStyles';
import { startNewAfterWin } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import { ming } from '../../utils/COLORS';

const NewGameButton = styled.button`
  ${buttonStyles}
`;

const Text = styled.p`
  display: flex;
  height: calc((100% / 3) * 2);
  width: 100%;
  color: ${ming};
  font-size: 35px;
  line-height: 70px;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  box-sizing: border-box;
`;

const WinBanner: React.FC = () => {
  const { dispatch } = useAppContext();
  return (
    <>
      <Text>Congratulations! You win!</Text>
      <NewGameButton onClick={() => startNewAfterWin(dispatch)}>
        Start New Game
      </NewGameButton>
    </>
  );
};

export default WinBanner;
