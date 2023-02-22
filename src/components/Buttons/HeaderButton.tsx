import styled from 'styled-components';
import BasicButton from './BasicButton';
import { aliceBlue, ming } from '../../utils/COLORS';

const HeaderButton = styled(BasicButton)`
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
  width: 130px;
  color: ${aliceBlue};
  grid-column-start: 3;
  max-width: 30%;

  &:hover {
    color: ${ming};
    background: ${aliceBlue};
  }
`;

export default HeaderButton;
