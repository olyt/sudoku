import styled from 'styled-components';

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

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
      theme.breakpoints.lg}) {
    width: 75vw;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 98vw;
  }
`;

export default BasicGrid;
