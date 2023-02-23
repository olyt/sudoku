import React from 'react';
import styled from 'styled-components';
import BoardCell from '../Cells/BoardCell';
import { useAppContext } from '../../context/AppContext';
import BasicGrid from './BasicGrid';

const StyledBoardGrid = styled(BasicGrid)`
  width: 60%;
  height: 60%;
`;

const BoardGrid: React.FC = () => {
  const { boards } = useAppContext();

  const cells = boards.currentBoard.map((row, y) =>
    row.map((num, x) => (
      <BoardCell value={num} x={x} y={y} key={`x:${x},y:${y}`} />
    ))
  );

  return (
    <StyledBoardGrid columns={9} rows={9}>
      {cells}
    </StyledBoardGrid>
  );
};

export default BoardGrid;
