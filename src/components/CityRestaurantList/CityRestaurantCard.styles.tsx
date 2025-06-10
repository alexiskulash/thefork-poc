import styled from '@emotion/styled';

export const Card = styled.div`
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  overflow: hidden;
  border: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};

  transition: box-shadow 150ms ease-out;

  &:hover {
    box-shadow:
      0 0.5rem 1.5rem -0.25rem
        ${({ theme }) =>
          theme.colors.semanticColorsShadowsHighlightAmbientLight},
      0 0.25rem 0.5rem 0
        ${({ theme }) => theme.colors.semanticColorsShadowsHighlightKeyLight};
  }
`;

export const RestaurantImage = styled.img`
  width: 100%;
  height: 128px;
  object-fit: cover;
  display: block;
`;

export const Content = styled.div`
  padding: 12px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const RestaurantInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RestaurantName = styled.h3`
  margin: 0;
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const RatingValue = styled.span`
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
`;

export const Address = styled.p`
  margin: 0;
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextSecondary};
`;

export const BookButtonWrapper = styled.div`
  flex-shrink: 0;
  align-self: center;
`;
