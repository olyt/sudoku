import React, { MouseEventHandler } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { tryToUndo } from '../../../context/history/operations';
import { ReactComponent as UndoSVG } from '../../../assets/svg/undo.svg';
import { ReactComponent as HintSVG } from '../../../assets/svg/hint.svg';
import FeatureButton, { getIcon } from '../FeatureButton';

const UndoIcon = getIcon(UndoSVG);
const HintIcon = getIcon(HintSVG);

const FeatureButtons: React.FC = () => {
  const { dispatch, history, hints } = useAppContext();

  const handleUndo: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(tryToUndo());
  };

  const handleHint: MouseEventHandler<HTMLButtonElement> = () => {
    console.log('hint');
  };

  return (
    <>
      <FeatureButton handler={handleHint} error={!hints}>
        <HintIcon error={!hints} />
      </FeatureButton>
      <FeatureButton handler={handleUndo} error={history.error}>
        <UndoIcon error={history.error} />
      </FeatureButton>
    </>
  );
};

export default FeatureButtons;
