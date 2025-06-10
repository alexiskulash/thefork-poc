import styled from '@emotion/styled';

export const Wrapper = styled.div`
  margin-bottom: 24px;
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

export const CitiesScroll = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  /* Hide scrollbar while maintaining functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure city cards are properly sized */
  > * {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
`;
