import { css } from 'styled-components';
import { aliceBlue, ming } from './COLORS';

export const buttonStyles = css`
  height: calc(100% / 3);
  width: 100%;
  background: transparent;
  color: ${ming};
  font-size: 25px;
  transition: 0.3s;

  &:hover {
    background: ${ming};
    color: ${aliceBlue};
  }
`;
