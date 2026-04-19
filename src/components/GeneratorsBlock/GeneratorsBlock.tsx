import React from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { EGeneratorType, EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { setGeneratorType } from '../../context/generator/actions';

const GeneratorsBlock: React.FC = () => {
    const dispatch = useAppDispatch();
    const setGenerator: (generatorType: EGeneratorType) => void = (generatorType) => {
        dispatch(setGeneratorType(generatorType));
        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty))
    };

    const generateButtons = (): React.ReactElement[] => {
        return (Object.values(EGeneratorType) as EGeneratorType[]).map((generatorType) => {
            return (
                <ModalButton
                    key={generatorType}
                    onClick={() => setGenerator(generatorType)}
                >
                    {generatorType}
                </ModalButton>
            );
        });
    };

    return <>{generateButtons()}</>;
};

export default GeneratorsBlock;
