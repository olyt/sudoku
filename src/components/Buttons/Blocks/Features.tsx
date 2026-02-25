import React, { MouseEventHandler, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { tryToUndo } from '../../../context/history/operations';
import { ReactComponent as UndoSVG } from '../../../assets/svg/undo.svg';
import { ReactComponent as HintSVG } from '../../../assets/svg/hint.svg';
import FeatureButton, { getIcon } from '../FeatureButton';
import { hint } from '../../../context/hints/operations';
import { setError as setHintError } from '../../../context/hints/actions';
import { setError as setHistoryError } from '../../../context/history/actions';

const UndoIcon = getIcon(UndoSVG);
const HintIcon = getIcon(HintSVG);

const ERROR_ANIMATION_MS = 400;

const Features: React.FC = () => {
    const { dispatch, history, hints } = useAppContext();

    useEffect(() => {
        if (!hints.error) {
            return;
        }

        const timer = setTimeout(
            () => dispatch(setHintError(false)),
            ERROR_ANIMATION_MS
        );

        return () => clearTimeout(timer);
    }, [hints.error, dispatch]);

    useEffect(() => {
        if (!history.error) {
            return;
        }

        const timer = setTimeout(
            () => dispatch(setHistoryError(false)),
            ERROR_ANIMATION_MS
        );

        return () => clearTimeout(timer);
    }, [history.error, dispatch]);

    const handleUndo: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(tryToUndo());
    };

    const handleHint: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(hint());
    };

    return (
        <>
            <FeatureButton onClick={handleHint} $error={hints.error}>
                {!!hints.count && <span>{hints.count}</span>}
                <HintIcon $error={hints.error} />
            </FeatureButton>
            <FeatureButton onClick={handleUndo} $error={history.error}>
                <UndoIcon $error={history.error} />
            </FeatureButton>
        </>
    );
};

export default Features;
