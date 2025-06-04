import styled from '@emotion/styled';

export const PhotoGrid = styled.div`
  display: grid;
  height: 174px;
  gap: 4px;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  overflow: hidden;
`;

export const PhotoWrapper = styled.div<{ gridPosition: number }>`
  display: flex;
  overflow: hidden;
  ${({ gridPosition }) => {
    switch (gridPosition) {
      case 0:
        return `
          grid-row: 1 / span 2;
          grid-column: 1 / span 2;
        `;
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

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
