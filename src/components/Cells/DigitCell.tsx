import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { setValueToBoard } from '../../context/actions';
import BasicCell from './BasicCell';
import { setClickedCellValue } from '../../context/clickedCell/actions';

interface INumBoxProps {
  value: number;
}

const StyledNumBox = styled(BasicCell)`
  border-right: 1px solid black;

  &:last-child {
    border-right: none;
  }
`;

const DigitCell: React.FC<INumBoxProps> = ({ value }) => {
  const { boards, clickedCell, dispatch } = useAppContext();
  const { y, x, value: clickedValue } = clickedCell;

  const setNumToCellOrHighlight: MouseEventHandler<HTMLDivElement> = () => {
    if (y !== -1 && x !== -1 && !clickedValue) {
      setValueToBoard(boards, clickedCell, dispatch, value);
    } else {
      dispatch(setClickedCellValue(value));
    }
  };

  return <StyledNumBox onClick={setNumToCellOrHighlight}>{value}</StyledNumBox>;
};

export default DigitCell;
