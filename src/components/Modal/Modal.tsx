import React, { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import { leaveAfterWin } from '../../context/operations';
import { useAppDispatch, useIsGameWon, useModal } from '../../context/AppContext';
import WinBanner from '../WinBanner/WinBanner';
import DifficultyBlock from '../DifficultyBlock/DifficultyBlock';
import { InnerModal, OuterModal } from './styles';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import GeneratorsBlock from '../GeneratorsBlock/GeneratorsBlock';
import { EModalComponents } from '../../context/types';

const components: { [Key: string]: FC } = {
    DifficultyBlock,
    GeneratorsBlock,
    WinBanner,
};

const Modal: FC = () => {
    const modal = useModal();
    const isGameWon = useIsGameWon();
    const dispatch = useAppDispatch();
    const Component = components[modal.component];

    const closeModal: () => void = useCallback(() => {
        if (isGameWon) {
            dispatch(leaveAfterWin());
        }

        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty));
    }, [isGameWon, dispatch]);

    useEffect(() => {
        const closeModalOnEsc = (event: KeyboardEvent): void => {
            if (event.code === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keyup', closeModalOnEsc);

        return () => {
            document.removeEventListener('keyup', closeModalOnEsc);
        };
    }, [closeModal]);

    const closeModalOnClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    if (!modal.isOpen) {
        return null;
    }

    return (
        <OuterModal onClick={closeModalOnClick}>
            <InnerModal>
                <Component />
            </InnerModal>
        </OuterModal>
    );
};

export default Modal;
