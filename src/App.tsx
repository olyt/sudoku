import React, { MouseEventHandler } from 'react';
import BoardGrid from './components/Grids/BoardGrid';
import Header from './components/Header/Header';
import DigitsGrid from './components/Grids/DigitsGrid';
import Modal from './components/Modal/Modal';
import { useAppContext } from './context/AppContext';
import styled from 'styled-components';
import useGameStatusTracking from './hooks/useGameStatusTracking';
import { resetClickedCell } from './context/clickedCell/actions';

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
  //z-index: -1;
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
      <BoardGrid />
      <DigitsGrid />
      {modal.isOpen && <Modal />}
    </AppWrapper>
  );
};
export default App;
