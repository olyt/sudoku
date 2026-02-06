import styled from 'styled-components';
import BasicButton from './BasicButton';

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

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        max-width: none;
        width: calc(100% / 3);
        flex: 1;

        &:hover,
        &:active {
            color: ${({ theme }) => theme.primaryLight};
            background: none;
        }
    }
`;

export default HeaderButton;
