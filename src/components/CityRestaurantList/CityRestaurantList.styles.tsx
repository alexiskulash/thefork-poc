import styled from '@emotion/styled';

export const Wrapper = styled.div`
  flex: 1;
`;

export const Header = styled.div`
  padding: 0 16px 16px 16px;
`;

export const Title = styled.h2`
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  margin: 0;
`;

export const RestaurantsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 16px 100px 16px; /* Extra bottom padding for scroll space */
`;
