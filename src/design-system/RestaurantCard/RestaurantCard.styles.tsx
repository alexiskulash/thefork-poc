import styled from '@emotion/styled';

export const Wrapper = styled.div`
  position: relative;
  width: 228px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  padding-bottom: ${({ theme }) => theme.space.coreSpacing02};

  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  border: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};

  transition: box-shadow 150ms ease-out;

  &:hover {
    box-shadow:
      0 0.5rem 1.5rem -0.25rem
        ${({ theme }) =>
          theme.colors.semanticColorsShadowsHighlightAmbientLight},
      0 0.25rem 0.5rem 0
        ${({ theme }) => theme.colors.semanticColorsShadowsHighlightKeyLight};
  }

  a {
    text-decoration: none;
    color: inherit;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

export const PhotoWrapper = styled.div`
  height: 128.25px;
  overflow: hidden;
  border-top-left-radius: ${({ theme }) => theme.radii.coreRadiusL};
  border-top-right-radius: ${({ theme }) => theme.radii.coreRadiusL};
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 228/128.25;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex: 1 0 0;
    overflow: hidden;
    text-overflow: ellipsis;

    font-family:
      'Montserrat',
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-family:
      'Montserrat',
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  }
`;

export const Address = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    flex: 1 0 0;
    font-family:
      'Montserrat',
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.semanticColorsTextSecondary};
  }
`;

export const Content = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.space.coreSpacing02}
    ${({ theme }) => theme.space.coreSpacing05};
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing05};
`;

export const Information = styled.div`
  display: flex;
  padding-bottom: ${({ theme }) => theme.space.coreSpacing02};
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing02};
`;
