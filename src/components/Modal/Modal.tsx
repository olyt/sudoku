import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { leaveAfterWin, setModal } from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import DifficultyButtons from '../DifficultyButtons/DifficultyButtons';
import { aliceBlue } from '../../utils/COLORS';
import WinBanner from '../WinBanner/WinBanner';
import { GenericObject } from '../../types/types';
import { EGameStatus } from '../../context/types';

const OuterModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 10;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerModal = styled.div`
  width: 25%;
  height: 40%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 15;
  background: ${aliceBlue};
  border-radius: 25px;
  overflow: hidden;
`;

const components: GenericObject<FC> = {
  DifficultyButtons,
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
