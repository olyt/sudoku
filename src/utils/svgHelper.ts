import React from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

/** Props for controlling SVG icon dimensions */
export interface IBasicIconProps {
    width?: number;
    height?: number;
}

/**
 * @function getBasicIcon
 * @description Wraps an SVG component with styled-components, adding width/height props (default 24px)
 * @param {React.FC} svg - a React functional component rendering an SVG element
 * @returns {StyledComponent} - a styled SVG component accepting width and height props
 */
export const getBasicIcon = (
    svg: React.FC
): StyledComponent<
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    DefaultTheme,
    IBasicIconProps
> => {
    return styled(svg)<IBasicIconProps>`
        width: ${({ width }) => width || 24}px;
        height: ${({ height }) => height || 24}px;
    `;
};
