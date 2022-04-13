import React from 'react';
import styled from 'styled-components';
import Cell from '../Cell/Cell';
import { useAppContext } from '../../context/AppContext';
import { ming } from '../../utils/COLORS';

const StyledGrid = styled.section`
  width: 60%;
  height: 60%;
  max-height: 600px;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  box-shadow: 0 0 30px 5px ${ming};
`;

const Grid: React.FC = () => {
  const { state } = useAppContext();

  const cells = state.currentBoard.map((row, y) =>
    row.map((num, x) => <Cell val={num} x={x} y={y} key={`x:${x},y:${y}`} />)
  );

  return <StyledGrid>{cells}</StyledGrid>;
};

export default Grid;
