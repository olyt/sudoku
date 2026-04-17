import React from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { EGeneratorType, EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { setGeneratorType } from '../../context/generator/actions';

const GENERATOR_LABELS: Record<EGeneratorType, string> = {
    [EGeneratorType.Standard]: 'standard',
    [EGeneratorType.Symmetric]: 'symmetric',
    [EGeneratorType.Isomorphic]: 'isomorphic',
    [EGeneratorType.Technique]: 'technique',
};

const GeneratorsBlock: React.FC = () => {
    const dispatch = useAppDispatch();
    const setGenerator: (generatorType: EGeneratorType) => void = (generatorType) => {
        dispatch(setGeneratorType(generatorType));
        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty))
    };

    const generateButtons = (): React.ReactElement[] => {
        return (Object.values(GENERATOR_LABELS) as EGeneratorType[]).map((generatorType) => {
            const text = generatorType
                .charAt(0)
                .toUpperCase()
                .concat(generatorType.substring(1)) as EGeneratorType;

            return (
                <ModalButton
                    key={generatorType}
                    onClick={() => setGenerator(text)}
                >
                    {text}
                </ModalButton>
            );
        });
    };

    return <>{generateButtons()}</>;
};

export default GeneratorsBlock;
