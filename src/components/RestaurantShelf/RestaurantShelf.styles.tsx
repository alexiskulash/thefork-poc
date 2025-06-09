import styled from '@emotion/styled';

export const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing08};
  justify-content: space-between;
`;

export const SectionTitle = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  overflow: hidden;
  text-overflow: ellipsis;

  h2 {
    font-family:
      'Montserrat',
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
    line-height: 150%;
  }
`;

export const RestaurantsList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing05};
  overflow-x: auto;
  scroll-behavior: smooth;

  /* Hide scrollbar but keep functionality */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Ensure cards don't shrink */
  > * {
    flex-shrink: 0;
  }
`;
