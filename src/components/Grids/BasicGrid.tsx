import styled from 'styled-components';
import { ming } from '../../utils/COLORS';

interface Props {
  rows: number;
  columns: number;
}

const BasicGrid = styled.section<Props>`
  max-height: 600px;
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
  border: 3px solid black;
  box-shadow: 0 0 30px 5px ${ming};
  cursor: pointer;
`;

export default BasicGrid;
