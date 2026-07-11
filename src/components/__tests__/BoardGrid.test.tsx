import React, { useEffect } from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import theme from '../../theming/themes';
import { AppContextProvider, useAppDispatch } from '../../context/AppContext';
import BoardGrid from '../Grids/BoardGrid';
import { setBoard, setInitialBoard } from '../../context/boards/actions';
import { setGameStatus } from '../../context/gameStatus/actions';
import { setCurrentHint } from '../../context/hints/actions';
import { EGameStatus, IState } from '../../context/types';
import { copyBoard, getBlankBoard } from '../../utils/boardHelper';

const dispatchRef: { current: IState['dispatch'] } = {
    current: () => null,
};

const DispatchSpy: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatchRef.current = dispatch;
    }, [dispatch]);

    return null;
};

/**
 * Board fixture: cell (0,1) = 7 is a given; row 8 is filled on the current
 * board only (user-entered, so editable, and a finished area); everything
 * else is empty.
 */
const makeInitialBoard = (): TBoard => {
    const board = getBlankBoard();

    board[0][1] = 7;

    return board;
};

const makeCurrentBoard = (initialBoard: TBoard): TBoard => {
    const board = copyBoard(initialBoard);

    for (let x = 0; x < 9; x++) {
        board[8][x] = x + 1;
    }

    return board;
};

const renderGrid = () => {
    const utils = render(
        <AppContextProvider>
            <ThemeProvider theme={theme}>
                <DispatchSpy />
                <BoardGrid />
            </ThemeProvider>
        </AppContextProvider>
    );

    const getCells = () => utils.container.querySelectorAll('section > div');

    return { ...utils, getCells };
};

const startGame = () => {
    const initialBoard = makeInitialBoard();

    act(() => {
        dispatchRef.current(setInitialBoard(initialBoard));
        dispatchRef.current(setBoard(makeCurrentBoard(initialBoard)));
        dispatchRef.current(setGameStatus(EGameStatus.InProgress));
    });
};

const cellAt = (
    cells: NodeListOf<Element>,
    y: number,
    x: number
): Element => cells[y * 9 + x];

const pressKeyUp = (code: string) => {
    fireEvent.keyUp(document, { code });
};

const pressKeyDown = (code: string) => {
    fireEvent.keyDown(document, { code });
};

describe('BoardGrid', () => {
    beforeEach(() => {
        dispatchRef.current = () => null;
    });

    it('renders 81 cells with the board values', () => {
        const { getCells } = renderGrid();

        startGame();

        const cells = getCells();

        expect(cells).toHaveLength(81);
        expect(cellAt(cells, 0, 1)).toHaveTextContent('7');
        expect(cellAt(cells, 8, 0)).toHaveTextContent('1');
        expect(cellAt(cells, 8, 8)).toHaveTextContent('9');
        expect(cellAt(cells, 4, 4)).toBeEmptyDOMElement();
    });

    it('sets a digit on the selected cell via keyboard', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 1, 1));
        pressKeyUp('Digit5');

        expect(cellAt(getCells(), 1, 1)).toHaveTextContent('5');
    });

    it('sets a digit via numpad keys', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 2, 2));
        pressKeyUp('Numpad3');

        expect(cellAt(getCells(), 2, 2)).toHaveTextContent('3');
    });

    it('does not overwrite initial board cells', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 0, 1));
        pressKeyUp('Digit5');

        expect(cellAt(getCells(), 0, 1)).toHaveTextContent('7');
    });

    it('ignores clicks and keys when the game is not active', () => {
        const { getCells } = renderGrid();

        fireEvent.click(cellAt(getCells(), 1, 1));
        pressKeyUp('Digit5');

        expect(cellAt(getCells(), 1, 1)).toBeEmptyDOMElement();
    });

    it('ignores non-digit, non-escape keys', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 1, 1));
        pressKeyUp('KeyA');
        pressKeyDown('KeyA');
        pressKeyUp('Digit5');

        expect(cellAt(getCells(), 1, 1)).toHaveTextContent('5');
    });

    it('escape clears the selection so digits no longer apply', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 1, 1));
        pressKeyUp('Escape');
        pressKeyUp('Digit7');

        expect(cellAt(getCells(), 1, 1)).toBeEmptyDOMElement();
    });

    it('clicking the selected cell again deselects it', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 1, 1));
        fireEvent.click(cellAt(getCells(), 1, 1));
        pressKeyUp('Digit7');

        expect(cellAt(getCells(), 1, 1)).toBeEmptyDOMElement();
    });

    it('moves the selection with arrow keys', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 1, 1));

        pressKeyDown('ArrowRight');
        pressKeyUp('Digit4');
        expect(cellAt(getCells(), 1, 2)).toHaveTextContent('4');

        pressKeyDown('ArrowDown');
        pressKeyUp('Digit6');
        expect(cellAt(getCells(), 2, 2)).toHaveTextContent('6');

        pressKeyDown('ArrowLeft');
        pressKeyUp('Digit8');
        expect(cellAt(getCells(), 2, 1)).toHaveTextContent('8');

        pressKeyDown('ArrowUp');
        pressKeyUp('Digit9');
        expect(cellAt(getCells(), 1, 1)).toHaveTextContent('9');
    });

    it('wraps the selection around the board edges', () => {
        const { getCells } = renderGrid();

        startGame();

        fireEvent.click(cellAt(getCells(), 0, 0));

        // (0,0) -> up wraps to (8,0)
        pressKeyDown('ArrowUp');
        pressKeyUp('Digit5');
        expect(cellAt(getCells(), 8, 0)).toHaveTextContent('5');

        // (8,0) -> left wraps to (8,8)
        pressKeyDown('ArrowLeft');
        pressKeyUp('Digit4');
        expect(cellAt(getCells(), 8, 8)).toHaveTextContent('4');

        // (8,8) -> down wraps to (0,8)
        pressKeyDown('ArrowDown');
        pressKeyUp('Digit3');
        expect(cellAt(getCells(), 0, 8)).toHaveTextContent('3');

        // (0,8) -> right wraps to (0,0)
        pressKeyDown('ArrowRight');
        pressKeyUp('Digit2');
        expect(cellAt(getCells(), 0, 0)).toHaveTextContent('2');
    });

    it('selects (0,0) when an arrow is pressed with no selection', () => {
        const { getCells } = renderGrid();

        startGame();

        pressKeyDown('ArrowDown');
        pressKeyUp('Digit2');

        expect(cellAt(getCells(), 0, 0)).toHaveTextContent('2');
    });

    it('displays the current hint value on an empty cell', () => {
        const { getCells } = renderGrid();

        startGame();

        act(() => {
            dispatchRef.current(setCurrentHint({ y: 2, x: 3, value: 9 }));
        });

        expect(cellAt(getCells(), 2, 3)).toHaveTextContent('9');
    });
});
