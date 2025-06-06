import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space.coreSpacing05}
    ${({ theme }) => theme.space.coreSpacing06}
    ${({ theme }) => theme.space.coreSpacing09}
    ${({ theme }) => theme.space.coreSpacing06};
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing04};
  border-top: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  background: ${({ theme }) =>
    theme.colors.semanticColorsModalPrimaryBackgroundColor};
  position: sticky;
  bottom: 0;
  z-index: 10;
`;
