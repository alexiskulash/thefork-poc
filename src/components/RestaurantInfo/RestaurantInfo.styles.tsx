import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing06};
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing06};
  width: 100%;
`;

export const RatingContainer = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.space.coreSpacing02};
  align-items: center;
  gap: 4px;
`;

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing04};
  width: 100%;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing04};
  width: 100%;
`;

export const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  flex: 1 0 0;
`;

export const FoodTypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  flex: 1 0 0;
`;
