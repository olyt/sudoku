import { MouseEventHandler, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { setValueToBoard } from '../context/operations';
import { setClickedCell } from '../context/clickedCell/actions';

export type THandlerCreator = <T extends number | undefined>(
  valueToSet: number
) => T extends undefined ? () => void : MouseEventHandler<HTMLDivElement>;

type TReturnType<T extends number | undefined> = T extends undefined
  ? THandlerCreator
  : MouseEventHandler<HTMLDivElement>;

type TCellValueHandlerHook = (
  newValue?: number
) => TReturnType<typeof newValue>;

const useCellValueHandler: TCellValueHandlerHook = (newValue) => {
  const {
    boards,
    clickedCell: { y, x },
    dispatch,
  } = useAppContext();
  const createHandler = useCallback<THandlerCreator>(
    (valueToSet) => () => {
      if (y !== -1 && x !== -1 && !boards.initialBoard[y][x]) {
        dispatch(setValueToBoard(valueToSet));
      } else {
        dispatch(setClickedCell({ y: -1, x: -1, value: valueToSet }));
      }
    },
    [boards.initialBoard, y, x, dispatch]
  );

  if (!newValue) {
    return createHandler;
  }

  return createHandler<number>(newValue);
};
export default useCellValueHandler;
