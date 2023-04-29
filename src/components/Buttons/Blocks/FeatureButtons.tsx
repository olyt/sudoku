import React, { MouseEventHandler } from 'react';
import { useAppContext } from '../../../context/AppContext';
import { tryToUndo } from '../../../context/history/operations';
import { ReactComponent as UndoIcon } from '../../../assets/svg/undo.svg';
import FeatureButton from '../FeatureButton';

const FeatureButtons: React.FC = () => {
  const { dispatch, history } = useAppContext();

  const handleUndo: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(tryToUndo());
  };

  return (
    <>
      <FeatureButton
        handler={handleUndo}
        icon={UndoIcon}
        error={history.error}
      />
    </>
  );
};

export default FeatureButtons;
