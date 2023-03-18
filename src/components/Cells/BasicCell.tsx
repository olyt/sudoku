import styled from 'styled-components';

const BasicCell = styled.div`
  font-size: 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.primaryLight};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryLight};
  }
`;

export default BasicCell;
