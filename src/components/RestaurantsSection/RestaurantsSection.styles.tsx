import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing04};
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing08};
  width: 100%;
`;

export const RestaurantsList = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing05};
  width: 100%;
  overflow-x: auto;
`;

export const RestaurantCardWrapper = styled.div`
  width: 228px;
  flex-shrink: 0;
`;
