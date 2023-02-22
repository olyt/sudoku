import React, { FC, MouseEventHandler } from 'react';
import { leaveAfterWin, setModal } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import WinBanner from '../WinBanner/WinBanner';
import { GenericObject } from '../../types/types';
import { EGameStatus } from '../../context/types';
import DifficultyBlock from '../DifficultyBlock/DifficultyBlock';
import { InnerModal, OuterModal } from './styles';

const components: GenericObject<FC> = {
  DifficultyBlock,
  WinBanner,
};

const Modal: FC = () => {
  const { state, dispatch } = useAppContext();
  const Component = components[state.modal.component];

  const closeModal: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      if (state.gameStatus === EGameStatus.Win) {
        leaveAfterWin(dispatch);
      }

      dispatch(setModal(false));
    }
  };

  return (
    <OuterModal onClick={closeModal}>
      <InnerModal>
        <Component />
      </InnerModal>
    </OuterModal>
  );
};

export default Modal;
