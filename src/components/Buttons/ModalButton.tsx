import styled from 'styled-components';
import BasicButton from './BasicButton';

const ModalButton = styled(BasicButton)`
    height: calc(100% / 3);
    width: 100%;
    color: ${({ theme }) => theme.primary};
    font-size: 25px;

    &:hover {
        color: ${({ theme }) => theme.primaryLight};
        background: ${({ theme }) => theme.primary};
    }
`;

export default ModalButton;
