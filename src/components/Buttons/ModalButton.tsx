import styled from 'styled-components';
import { aliceBlue, ming } from '../../utils/COLORS';
import BasicButton from './BasicButton';

const ModalButton = styled(BasicButton)`
  height: calc(100% / 3);
  width: 100%;
  color: ${ming};
  font-size: 25px;

  &:hover {
    color: ${aliceBlue};
    background: ${ming};
  }
`;

export default ModalButton;
