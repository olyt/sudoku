import styled from 'styled-components';
import { aliceBlue } from '../../utils/COLORS';

export const StyledHeader = styled.header`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: 100px;
  border: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  background: rgb(0, 109, 119);
  background: linear-gradient(
    180deg,
    rgba(0, 109, 119, 1) 0%,
    rgba(131, 197, 190, 1) 60%,
    rgba(237, 246, 249, 0.4) 100%
  );
`;

export const H1 = styled.h1`
  text-transform: uppercase;
  font-size: 30px;
  grid-column-start: 2;
  justify-self: center;
  letter-spacing: 10px;
  color: ${aliceBlue};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;
