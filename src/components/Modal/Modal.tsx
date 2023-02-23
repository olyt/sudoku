import React, { FC, MouseEventHandler } from 'react';
import { leaveAfterWin } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import WinBanner from '../WinBanner/WinBanner';
import { GenericObject } from '../../types/types';
import { EGameStatus } from '../../context/types';
import DifficultyBlock from '../DifficultyBlock/DifficultyBlock';
import { InnerModal, OuterModal } from './styles';
import { setModalIsOpen } from '../../context/modal/actions';

const components: GenericObject<FC> = {
  DifficultyBlock,
  WinBanner,
};

const Modal: FC = () => {
  const { modal, gameInfo, dispatch } = useAppContext();
  const Component = components[modal.component];

  const closeModal: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      if (gameInfo.gameStatus === EGameStatus.Win) {
        leaveAfterWin(dispatch);
      }

      dispatch(setModalIsOpen(false));
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
