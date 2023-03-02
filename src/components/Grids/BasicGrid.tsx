import styled from 'styled-components';
import { ming } from '../../constants/colors';

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
  box-shadow: 0 0 30px 5px ${ming};
  cursor: pointer;
`;

export default BasicGrid;
