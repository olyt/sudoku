import React from 'react';
import NumBox from '../NumBox/NumBox';
import styled from 'styled-components';
import { ming } from '../../utils/COLORS';

type numsFn = () => JSX.Element[];

const StyledNumPad = styled.div`
  width: 60%;
  height: 8%;
  max-height: 600px;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(1, 1fr);
  border: 3px solid black;
  position: relative;
  box-shadow: 0 0 30px 5px ${ming};

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

const NumPad: React.FC = () => {
  const generateNums: numsFn = () => {
    const nums = [];
    for (let i = 1; i <= 9; i++) {
      nums.push(<NumBox value={i} key={i} />);
    }

    return nums;
  };

  return <StyledNumPad>{generateNums()}</StyledNumPad>;
};

export default NumPad;
