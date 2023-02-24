import styled from 'styled-components';
import { aliceBlue } from '../../constants/colors';

export const OuterModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 10;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerModal = styled.div`
  width: 25%;
  height: 40%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 15;
  background: ${aliceBlue};
  border-radius: 25px;
  overflow: hidden;
`;
