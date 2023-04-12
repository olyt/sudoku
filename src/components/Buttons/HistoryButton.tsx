import styled from 'styled-components';
import BasicButton from './BasicButton';

const HistoryButton = styled(BasicButton)`
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 5px;

  &:hover {
    border: none;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
  }
`;

export default HistoryButton;
