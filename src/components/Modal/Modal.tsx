import React, { FC, MouseEventHandler, useCallback, useEffect } from 'react';
import { leaveAfterWin } from '../../context/operations';
import { useAppDispatch, useGameStatus, useModal } from '../../context/AppContext';
import WinBanner from '../WinBanner/WinBanner';
import { EGameStatus } from '../../context/types';
import DifficultyBlock from '../DifficultyBlock/DifficultyBlock';
import { InnerModal, OuterModal } from './styles';
import { setModalIsOpen } from '../../context/modal/actions';

const components: { [Key: string]: FC } = {
    DifficultyBlock,
    WinBanner,
};

const Modal: FC = () => {
    const modal = useModal();
    const gameStatus = useGameStatus();
    const dispatch = useAppDispatch();
    const Component = components[modal.component];

    const closeModal: () => void = useCallback(() => {
        if (gameStatus === EGameStatus.Win) {
            dispatch(leaveAfterWin());
        }

        dispatch(setModalIsOpen(false));
    }, [gameStatus, dispatch]);

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
