import { css } from 'styled-components';

export const defaultMixin = css`
  color: ${({ theme }) => theme.defaultBlack};
  background: ${({ theme }) => theme.primaryLight};
`;

export const clickedMixin = css`
  color: ${({ theme }) => theme.primaryLight};
  background: ${({ theme }) => theme.primary};
`;

export const highlightedOrSimilarNumMixin = css`
  color: ${({ theme }) => theme.defaultBlack};
  background: ${({ theme }) => theme.secondary};
`;

export const finishedMixin = css`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.secondaryLight};
`;

export const hintMixin = css`
  color: ${({ theme }) => theme.secondaryHint};
  background: ${({ theme }) => theme.primaryHint};
`;
