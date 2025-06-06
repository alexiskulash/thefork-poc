import styled from '@emotion/styled';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 822px;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.coreSpacing11} 21px
    ${({ theme }) => theme.space.coreSpacing08} 21px;
  gap: ${({ theme }) => theme.space.coreSpacing08};
  flex: 1;
  overflow-y: auto;
`;
export const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RestaurantDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing06};
`;

export const RestaurantHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing06};
`;

export const RestaurantTitle = styled.h1`
  flex: 1;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  font-family: ${({ theme }) =>
    theme.typography.coreTypographyFontFamilyProduct};
  font-size: ${({ theme }) => theme.typography.coreTypographyFontSizeHeadingH2};
  font-weight: ${({ theme }) =>
    theme.typography.coreTypographyFontWeightExtraBold};
  line-height: 130%;
  margin: 0;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: ${({ theme }) => theme.space.coreSpacing02};
`;

export const RestaurantMetadata = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

export const MetadataRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

export const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  flex: 1;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  flex: 1;
`;

export const RelatedRestaurantsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.coreSpacing08};
`;

export const SeeMoreText = styled.span`
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  font-family: ${({ theme }) =>
    theme.typography.coreTypographyFontFamilyProduct};
  font-size: ${({ theme }) => theme.typography.coreTypographyFontSizeTextT2};
  font-weight: ${({ theme }) =>
    theme.typography.coreTypographyFontWeightMedium};
  text-decoration: underline;
`;

export const RestaurantList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing05};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: ${({ theme }) => theme.space.coreSpacing02};

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const RestaurantCardWrapper = styled.div`
  flex-shrink: 0;
  width: 228px;
`;
