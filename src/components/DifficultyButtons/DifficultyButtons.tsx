import React from 'react';
import styled from 'styled-components';
import { DIFFICULTY } from '../../utils/generateBoard';
import { IDifficulties } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { setModal, setModalComponent, startGame } from '../../context/actions';
import { EModalComponents } from '../../context/types';
import { buttonStyles } from '../../utils/buttonStyles';

const DifficultyButton = styled.button`
  ${buttonStyles}
`;

const DifficultyButtons: React.FC = () => {
  const { dispatch } = useAppContext();

  const startNewGame: (difficulty: keyof IDifficulties) => void = (
    difficulty
  ) => {
    startGame(difficulty, dispatch);
    dispatch(setModal(false));
    dispatch(setModalComponent(EModalComponents.Empty));
  };

  const generateButtons = (): JSX.Element[] => {
    return Object.keys(DIFFICULTY).map((difficulty) => {
      const text = difficulty
        .charAt(0)
        .toUpperCase()
        .concat(difficulty.substring(1));
      return (
        <DifficultyButton
          key={difficulty}
          onClick={() => startNewGame(difficulty as keyof IDifficulties)}
        >
          {text}
        </DifficultyButton>
      );
    });
  };
  return <>{generateButtons()}</>;
};

export default DifficultyButtons;
