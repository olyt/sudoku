import styled from 'styled-components';
import { mobile, tablet } from '../../constants/breakpoints';

interface Props {
  rows: number;
  columns: number;
}

const BasicGrid = styled.section<Props>`
  max-height: 500px;
  max-width: 500px;
  width: 60vw;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  border: 3px solid black;
  box-shadow: 0 0 30px 5px ${({ theme }) => theme.primary};
  cursor: pointer;

  @media (min-width: ${tablet.min}) and (max-width: ${tablet.max}) {
    width: 75vw;
  }

  @media (max-width: ${mobile.max}) {
    width: 95vw;
  }
`;

export default BasicGrid;
