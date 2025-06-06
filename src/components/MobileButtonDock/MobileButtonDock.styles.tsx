import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space.coreSpacing05} 21px
    ${({ theme }) => theme.space.coreSpacing09} 21px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  background: ${({ theme }) =>
    theme.colors.semanticColorsModalPrimaryBackgroundColor};
  position: absolute;
  left: 0;
  bottom: 0;
  height: 92px;
  z-index: 10;
`;
