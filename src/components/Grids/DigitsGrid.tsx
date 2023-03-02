import React from 'react';
import DigitCell from '../Cells/DigitCell';
import BasicGrid from './BasicGrid';

type TNumsFn = () => JSX.Element[];

const DigitsGrid: React.FC = () => {
  const generateNums: TNumsFn = () => {
    const nums = [];
    for (let i = 1; i <= 9; i++) {
      nums.push(<DigitCell value={i} key={i} />);
    }

    return nums;
  };

  return (
    <BasicGrid columns={9} rows={1}>
      {generateNums()}
    </BasicGrid>
  );
};

export default DigitsGrid;
