import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { setClickedCellValue, setValueToBoard } from '../../context/actions';
import { aliceBlue } from '../../utils/COLORS';
import BasicCell from './BasicCell';

interface INumBoxProps {
  value: number;
}

const StyledNumBox = styled(BasicCell)`
  background-color: ${aliceBlue};
`;

const DigitCell: React.FC<INumBoxProps> = ({ value }) => {
  const { state, dispatch } = useAppContext();
  const { y, x } = state.clickedCell;

  const setNumToCell: MouseEventHandler<HTMLDivElement> = () => {
    if (y !== -1 && x !== -1) {
      setValueToBoard(state, dispatch, value);
    } else {
      dispatch(setClickedCellValue(value));
    }
  };

  return <StyledNumBox onClick={setNumToCell}>{value}</StyledNumBox>;
};

export default DigitCell;
