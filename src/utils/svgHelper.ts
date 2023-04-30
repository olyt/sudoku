import styled, { DefaultTheme, StyledComponent } from 'styled-components';
import React from 'react';

export interface IBasicIconProps {
  width?: number;
  height?: number;
}

// StyledComponent<React.FunctionComponent<React.SVGProps<SVGSVGElement> & {title?: string | undefined}>, DefaultTheme, IBasicIconProps, never>

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
