import React from 'react';
import { DIFFICULTIES } from '../../utils/generateBoard';
import { IDifficulties } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { startGame } from '../../context/actions';
import { EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';

const DifficultyBlock: React.FC = () => {
  const { dispatch } = useAppContext();

  const startNewGame: (difficulty: keyof IDifficulties) => void = (
    difficulty
  ) => {
    startGame(difficulty, dispatch);
    dispatch(setModalIsOpen(false));
    dispatch(setModalComponent(EModalComponents.Empty));
  };

  const generateButtons = (): JSX.Element[] => {
    return Object.keys(DIFFICULTIES).map((difficulty) => {
      const text = difficulty
        .charAt(0)
        .toUpperCase()
        .concat(difficulty.substring(1));
      return (
        <ModalButton
          key={difficulty}
          onClick={() => startNewGame(difficulty as keyof IDifficulties)}
        >
          {text}
        </ModalButton>
      );
    });
  };
  return <>{generateButtons()}</>;
};

export default DifficultyBlock;
