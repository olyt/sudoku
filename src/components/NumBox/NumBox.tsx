import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { setClickedCellValue, setValueToBoard } from '../../context/actions';

interface NumBoxProps {
  value: number;
}

interface StyledNumBoxInterface {
  num: number;
}

const StyledNumBox = styled.div<StyledNumBoxInterface>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  border-right: ${({ num }) => num < 9 && '1px solid black'};
  cursor: pointer;
`;

const NumBox: React.FC<NumBoxProps> = ({ value }) => {
  const { state, dispatch } = useAppContext();
  const { y, x } = state.clickedCell;

  const setNumToCell: MouseEventHandler<HTMLDivElement> = () => {
    if (y !== -1 && x !== -1) {
      setValueToBoard(state, dispatch, value);
    } else {
      dispatch(setClickedCellValue(value));
    }
  };

  return (
    <StyledNumBox num={value} onClick={setNumToCell}>
      {value}
    </StyledNumBox>
  );
};

export default NumBox;
