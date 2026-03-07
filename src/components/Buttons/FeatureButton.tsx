import React from 'react';
import styled, { css, DefaultTheme, keyframes } from 'styled-components';
import HeaderButton from './HeaderButton';
import { getBasicIcon } from '../../utils/svgHelper';

type TStyledProps = {
    $error: boolean;
};

const getShake = (theme: DefaultTheme) => keyframes`
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

const animation = (theme: DefaultTheme) => css`
    animation: ${getShake(theme)} 0.4s 1 linear;
`;

const buttonErrorCss = css`
    background: ${({ theme }) => theme.lightError};
`;

const FeatureButton = styled(HeaderButton)<TStyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 75px;

    &:hover {
        ${({ $error }) => $error && buttonErrorCss};
    }
`;

export const getIcon = (icon: React.FC) => styled(
    getBasicIcon(icon)
)<TStyledProps>`
    fill: ${({ theme }) => theme.primaryLight};
    transition: 0.3s ease;
    ${(props) => props.$error && animation(props.theme)};

    ${FeatureButton}:hover & {
        fill: ${({ theme }) => theme.primary};
    }
`;

export default FeatureButton;
