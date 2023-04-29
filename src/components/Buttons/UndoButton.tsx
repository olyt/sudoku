import React, { MouseEventHandler } from 'react';
import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  Keyframes,
  keyframes,
  ThemeProps,
} from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { tryToUndo } from '../../context/history/operations';
import { ReactComponent as Icon } from '../../assets/svg/undo.svg';
import HeaderButton from './HeaderButton';
import { getBasicIcon } from '../../utils/svgHelper';

type TStyledProps = {
  error: boolean;
};

const getShake = (theme: DefaultTheme): Keyframes => keyframes`
  0% {
    fill: ${theme.error};
    transform: translate(15px);
  }
  20% {
    transform: translate(-15px);
  }
  40% {
    transform: translate(8px);
  }
  60% {
    transform: translate(-8px);
  }
  80% {
    transform: translate(4px);
  }
  100% {
    transform: translate(0px);
    fill: ${theme.error};
  }
`;

const animation = (
  theme: DefaultTheme
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  animation: ${getShake(theme)} 0.4s 1 linear;
`;

const errorButtonCss = css`
  background: ${({ theme }) => theme.lightError};
`;

const UndoStyledButton = styled(HeaderButton)<TStyledProps>`
  width: 75px;

  &:hover {
    ${({ error }) => error && errorButtonCss};
  }
`;

const UndoStyledIcon = styled(getBasicIcon(Icon))<TStyledProps>`
  fill: ${({ theme }) => theme.primaryLight};
  transition: 0.3s ease;
  ${(props) => props.error && animation(props.theme)};

  ${UndoStyledButton}:hover & {
    fill: ${({ theme }) => theme.primary};
  }
`;

const UndoButton: React.FC = () => {
  const { dispatch, history } = useAppContext();

  const handleUndo: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(tryToUndo());
  };

  return (
    <UndoStyledButton onClick={handleUndo} error={history.error}>
      <UndoStyledIcon error={history.error} />
    </UndoStyledButton>
  );
};

export default UndoButton;
