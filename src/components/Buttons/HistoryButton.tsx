import styled, {
  css,
  DefaultTheme,
  FlattenInterpolation,
  Keyframes,
  keyframes,
  ThemeProps,
} from 'styled-components';
import BasicButton from './BasicButton';

type TStyledProps = {
  error: boolean;
};

const getShake = (theme: DefaultTheme): Keyframes => keyframes`
  0% {
    background: ${theme.lightError};
    color: ${theme.error};
    transform: translate(15px);
    border-color: ${theme.error};
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
    background: ${theme.lightError};
    color: ${theme.error};
    border-color: ${theme.error};
  }
`;

const animation = (
  theme: DefaultTheme
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  animation: ${getShake(theme)} 0.4s 1 linear;
`;

const HistoryButton = styled(BasicButton)<TStyledProps>`
  padding: 10px 15px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  border-radius: 5px;
  ${(props) => props.error && animation(props.theme)};

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
  }
`;

export default HistoryButton;
