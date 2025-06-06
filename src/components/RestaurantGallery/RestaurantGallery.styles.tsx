import styled from '@emotion/styled';

export const GalleryContainer = styled.div`
  display: grid;
  height: 174px;
  gap: 4px;
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
`;

export const ThumbnailImage = styled.img<{ gridPosition: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${({ gridPosition }) => {
    switch (gridPosition) {
      case 1:
        return `
          grid-row: 1 / span 1;
          grid-column: 3 / span 1;
        `;
      case 2:
        return `
          grid-row: 1 / span 1;
          grid-column: 4 / span 1;
        `;
      case 3:
        return `
          grid-row: 2 / span 1;
          grid-column: 3 / span 1;
        `;
      case 4:
        return `
          grid-row: 2 / span 1;
          grid-column: 4 / span 1;
        `;
      default:
        return '';
    }
  }}
`;
