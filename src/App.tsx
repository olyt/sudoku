import React, { MouseEventHandler } from 'react';
import Grid from './components/Grid/Grid';
import Header from './components/Header/Header';
import NumPad from './components/NumPad/NumPad';
import Modal from './components/Modal/Modal';
import { useAppContext } from './context/AppContext';
import styled from 'styled-components';
import { resetClickedCell } from './context/actions';
import useGameStatusTracking from './hooks/useGameStatusTracking';

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
  const { state, dispatch } = useAppContext();
  useGameStatusTracking();

  const undoClickedCell: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(resetClickedCell);
    }
  };

  return (
    <AppWrapper onClick={undoClickedCell}>
      <Header />
      <Grid />
      <NumPad />
      {state.modal.isOpen && <Modal />}
    </AppWrapper>
  );
};
export default App;
