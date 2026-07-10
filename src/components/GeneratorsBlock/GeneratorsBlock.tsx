import React from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { EGeneratorType, EModalComponents } from '../../context/types';
import ModalButtonsList from '../Buttons/Blocks/ButtonsList';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { setGeneratorType } from '../../context/generator/actions';

const GeneratorsBlock: React.FC = () => {
    const dispatch = useAppDispatch();

    const setGenerator: (generatorType: EGeneratorType) => void = (generatorType) => {
        dispatch(setGeneratorType(generatorType));
        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty));
    };

    return (
        <ModalButtonsList
            items={Object.values(EGeneratorType)}
            clickHandler={setGenerator}
        />
    );
};

export default GeneratorsBlock;
