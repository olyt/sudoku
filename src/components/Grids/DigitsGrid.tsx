import React from 'react';
import DigitCell from '../Cells/DigitCell';
import styled from 'styled-components';
import BasicGrid from './BasicGrid';

type TNumsFn = () => JSX.Element[];

const StyledDigitsGrid = styled(BasicGrid)`
  width: 60vw;
  height: calc(60vh / 9);
  position: relative;
`;

const DigitsGrid: React.FC = () => {
  const generateNums: TNumsFn = () => {
    const nums = [];
    for (let i = 1; i <= 9; i++) {
      nums.push(<DigitCell value={i} key={i} />);
    }

    return nums;
  };

  return (
    <StyledDigitsGrid columns={9} rows={1}>
      {generateNums()}
    </StyledDigitsGrid>
  );
};

export default DigitsGrid;
