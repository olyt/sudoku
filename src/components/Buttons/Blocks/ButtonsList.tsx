import React from 'react';
import ModalButton from '../ModalButton';

type TModalButtonsListProps<T extends string> = {
    items: readonly T[];
    clickHandler: (value: T) => void;
};

const ModalButtonsList = <T extends string,>({
    items,
    clickHandler,
}: TModalButtonsListProps<T>): React.JSX.Element => {
    const formatLabel = (label: T): string => {
        return label.charAt(0).toUpperCase().concat(label.substring(1));
    };

    return (
        <>
            {items.map((value) => {
                return (
                    <ModalButton
                        key={value}
                        onClick={() => clickHandler(value)}
                    >
                        {formatLabel(value)}
                    </ModalButton>
                );
            })}
        </>
    );
};

export default ModalButtonsList;
