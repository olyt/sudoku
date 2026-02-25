/**
 * @description Modal content displayed when the player wins.
 * Shows a congratulations message and a button to start a new game.
 */

import React from 'react';
import styled from 'styled-components';
import { startNewAfterWin } from '../../context/operations';
import { useAppContext } from '../../context/AppContext';
import ModalButton from '../Buttons/ModalButton';

const Text = styled.p`
    display: flex;
    height: calc((100% / 3) * 2);
    width: 100%;
    color: ${({ theme }) => theme.primary};
    font-size: 35px;
    line-height: 70px;
    justify-content: center;
    align-items: center;
    padding: 0 100px;
    box-sizing: border-box;

    @media (min-width: ${({ theme }) =>
            theme.breakpoints.smPlus}) and (max-width: ${({ theme }) =>
            theme.breakpoints.lg}) {
        font-size: 30px;
        line-height: 60px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        font-size: 25px;
        line-height: 50px;
    }
`;

const WinBanner: React.FC = () => {
    const { dispatch } = useAppContext();

    return (
        <>
            <Text>Congratulations! You win!</Text>
            <ModalButton onClick={() => dispatch(startNewAfterWin())}>
                Start New Game
            </ModalButton>
        </>
    );
};

export default WinBanner;
