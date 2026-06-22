import { describe, it, expect } from 'vitest';
import reducer from '../modal/reducer';
import { setModalIsOpen, setModalComponent } from '../modal/actions';
import { EModalComponents, TModalState } from '../types';

const initialState: TModalState = {
    isOpen: false,
    component: EModalComponents.Empty,
};

describe('modal reducer', () => {
    it('SetModalOpen sets isOpen', () => {
        const next = reducer(initialState, setModalIsOpen(true));

        expect(next.isOpen).toBe(true);
        expect(next.component).toBe(initialState.component);
    });

    it('SetModalComponent sets component', () => {
        const next = reducer(initialState, setModalComponent(EModalComponents.DifficultyBlock));

        expect(next.component).toBe(EModalComponents.DifficultyBlock);
        expect(next.isOpen).toBe(initialState.isOpen);
    });

    it('default returns state unchanged', () => {
        const next = reducer(initialState, { type: 'UNKNOWN' } as never);

        expect(next).toBe(initialState);
    });
});
