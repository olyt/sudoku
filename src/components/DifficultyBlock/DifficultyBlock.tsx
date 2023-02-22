import React from 'react';
import { DIFFICULTY } from '../../utils/generateBoard';
import { IDifficulties } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { setModal, setModalComponent, startGame } from '../../context/actions';
import { EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';

const DifficultyBlock: React.FC = () => {
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
