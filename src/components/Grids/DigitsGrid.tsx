import React from 'react';
import DigitCell from '../Cells/DigitCell';
import styled from 'styled-components';
import BasicGrid from './BasicGrid';

type TNumsFn = () => JSX.Element[];

const StyledDigitsGrid = styled(BasicGrid)`
  width: 60%;
  height: 8%;
  position: relative;

  //&:after {
  //  content: '';
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  height: 100%;
  //  width: 100%;
  //  background: rgba(0, 0, 0, 0.2);
  //}
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
