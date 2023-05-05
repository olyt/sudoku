import React, { MouseEventHandler } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { tryToUndo } from '../../../context/history/operations';
import { ReactComponent as UndoIcon } from '../../../assets/svg/undo.svg';
import { ReactComponent as HintIcon } from '../../../assets/svg/hint.svg';
import FeatureButton from '../FeatureButton';

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
      <FeatureButton handler={handleHint} icon={HintIcon} error={!hints} />
      <FeatureButton
        handler={handleUndo}
        icon={UndoIcon}
        error={history.error}
      />
    </>
  );
};

export default FeatureButtons;
