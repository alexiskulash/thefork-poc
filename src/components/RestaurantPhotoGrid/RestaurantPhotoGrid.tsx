import React from 'react';
import * as S from './RestaurantPhotoGrid.styles';

type RestaurantPhotoGridProps = {
  images: string[];
  restaurantName: string;
};

const RestaurantPhotoGrid: React.FC<RestaurantPhotoGridProps> = ({
  images,
  restaurantName,
}) => {
  // Ensure we have at least 5 images for the grid layout
  const displayImages = images.slice(0, 5);

  return (
    <S.PhotoGrid>
      {displayImages.map((image, index) => (
        <S.PhotoWrapper key={index} gridPosition={index}>
          <S.Photo src={image} alt={`${restaurantName} - Photo ${index + 1}`} />
        </S.PhotoWrapper>
      ))}
    </S.PhotoGrid>
  );
};

export default RestaurantPhotoGrid;
