import styled from 'styled-components';

export const StyledHeader = styled.header`
    box-sizing: border-box;
    display: grid;
    width: 100%;
    height: 100px;
    border: 0;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    background: rgb(0, 109, 119);
    background: linear-gradient(180deg,
    rgba(0, 109, 119, 1) 0%,
    rgba(131, 197, 190, 1) 60%,
    rgba(237, 246, 249, 0.4) 100%);

    @media (min-width: ${({ theme }) =>
        theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
    theme.breakpoints.lg}) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
    }
}
`;

export const H1 = styled.h1`
    text-transform: uppercase;
    font-size: 30px;
    grid-column-start: 2;
    justify-self: center;
    letter-spacing: 10px;
    transform: translateX(5px);
    color: ${({ theme }) => theme.primaryLight};

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}) {
        justify-self: center;
        grid-column-start: 1;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        grid-column-start: initial;
        justify-self: center;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}) {
        justify-content: right;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        justify-content: initial;
    }
`;
