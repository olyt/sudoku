import styled from 'styled-components';
import BasicButton from './BasicButton';
import { mobile } from '../../constants/breakpoints';

const HeaderButton = styled(BasicButton)`
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
  width: 130px;
  color: ${({ theme }) => theme.primaryLight};
  grid-column-start: 3;
  max-width: 30%;

  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primaryLight};
  }

  @media (max-width: ${mobile.max}) {
    max-width: initial;
    width: 50%;

    &:hover,
    &:active {
      color: ${({ theme }) => theme.primary};
      background: none;
    }
  }
`;

export default HeaderButton;
