import React, { MouseEventHandler } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { tryToUndo } from '../../../context/history/operations';
import { ReactComponent as UndoSVG } from '../../../assets/svg/undo.svg';
import { ReactComponent as HintSVG } from '../../../assets/svg/hint.svg';
import FeatureButton, { getIcon } from '../FeatureButton';
import { hint } from '../../../context/hints/operations';

const UndoIcon = getIcon(UndoSVG);
const HintIcon = getIcon(HintSVG);

const FeatureButtons: React.FC = () => {
  const { dispatch, history, hints } = useAppContext();

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

export default FeatureButtons;
