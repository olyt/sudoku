import React, { MouseEventHandler } from 'react';
import BoardGrid from './components/Grids/BoardGrid';
import Header from './components/Header/Header';
import DigitsGrid from './components/Grids/DigitsGrid';
import Modal from './components/Modal/Modal';
import { useAppContext } from './context/AppContext';
import styled from 'styled-components';
import useGameStatusTracking from './hooks/useGameStatusTracking';
import { resetClickedCell } from './context/clickedCell/actions';
import UndoButton from './components/Buttons/UndoButton';

const AppWrapper = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0 30px 0;
  position: relative;
  background: rgba(237, 246, 249, 0.4);

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
      theme.breakpoints.lg}) {
    height: ${window.innerHeight}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: ${window.innerHeight}px;
    padding-bottom: 10px;
  }
`;

const App: React.FC = () => {
  const { modal, dispatch } = useAppContext();
  useGameStatusTracking();

  const undoClickedCell: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(resetClickedCell);
    }
  };

  return (
    <AppWrapper onClick={undoClickedCell}>
      <Header />
      <UndoButton />
      <BoardGrid />
      <DigitsGrid />
      {modal.isOpen && <Modal />}
    </AppWrapper>
  );
};
export default App;
