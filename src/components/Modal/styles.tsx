import styled from 'styled-components';

export const OuterModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 10;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}) {
        height: ${window.innerHeight}px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        height: ${window.innerHeight}px;
    }
`;

export const InnerModal = styled.div`
    width: 25%;
    height: 40%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 15;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 25px;
    overflow: hidden;

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}) {
        width: 50%;
        height: 50%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 80%;
        height: 50%;
    }
`;
