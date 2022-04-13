import React from 'react';
import styled from 'styled-components';
import { DIFFICULTY } from '../../utils/generateBoard';
import { Difficulties } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { setModal, setModalComponent, startGame } from '../../context/actions';
import { ModalComponents } from '../../context/types';
import { buttonStyles } from '../../utils/buttonStyles';

const DifficultyButton = styled.button`
  ${buttonStyles}
`;

const DifficultyButtons: React.FC = () => {
  const { dispatch } = useAppContext();

  const startNewGame: (difficulty: keyof Difficulties) => void = (
    difficulty
  ) => {
    startGame(difficulty, dispatch);
    dispatch(setModal(false));
    dispatch(setModalComponent(ModalComponents.Empty));
  };

  const generateButtons = (): JSX.Element[] => {
    return Object.keys(DIFFICULTY).map((dif) => {
      const text = dif.charAt(0).toUpperCase().concat(dif.substring(1));
      return (
        <DifficultyButton
          key={dif}
          onClick={() => startNewGame(dif as keyof Difficulties)}
        >
          {text}
        </DifficultyButton>
      );
    });
  };
  return <>{generateButtons()}</>;
};

export default DifficultyButtons;
