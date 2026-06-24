import { describe, it, expect } from 'vitest';
import reducer from '../clickedCell/reducer';
import {
    setClickedCell,
    setClickedCellValue,
    setClickedCellCoordinates,
    resetClickedCell,
} from '../clickedCell/actions';
import { defaultCell } from '../state';

const cell: ICell = { y: 3, x: 5, value: 7 };

describe('clickedCell reducer', () => {
    it('SetClickedCell sets y/x/value', () => {
        const next = reducer(defaultCell, setClickedCell(cell));

        expect(next).toBe(cell);
    });

    it('SetClickedCellValue updates value only', () => {
        const next = reducer(cell, setClickedCellValue(9));

        expect(next.value).toBe(9);
        expect(next.y).toBe(cell.y);
        expect(next.x).toBe(cell.x);
    });

    it('SetClickedCellCoordinates updates y and x only', () => {
        const coords: ICellCoordinates = { y: 7, x: 2 };
        const next = reducer(cell, setClickedCellCoordinates(coords));

        expect(next.y).toBe(7);
        expect(next.x).toBe(2);
        expect(next.value).toBe(cell.value);
    });

    it('ResetClickedCell returns defaultCell', () => {
        const next = reducer(cell, resetClickedCell);

        expect(next).toBe(defaultCell);
    });

    it('default returns state unchanged', () => {
        const next = reducer(cell, { type: 'UNKNOWN' } as never);

        expect(next).toBe(cell);
    });
});
