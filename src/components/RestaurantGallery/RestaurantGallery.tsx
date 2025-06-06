import React from 'react';
import * as S from './RestaurantGallery.styles';

interface RestaurantGalleryProps {
  images: string[];
  alt?: string;
}

/**
 * Restaurant image gallery component that displays images in a grid layout
 * Main image takes 2x2 grid space, smaller images fill remaining spaces
 */
const RestaurantGallery: React.FC<RestaurantGalleryProps> = ({
  images,
  alt = '',
}) => {
  const [mainImage, ...otherImages] = images;

  return (
    <S.GalleryContainer>
      {mainImage && <S.MainImage src={mainImage} alt={alt} loading="lazy" />}
      {otherImages.slice(0, 4).map((image, index) => (
        <S.ThumbnailImage
          key={index}
          src={image}
          alt={alt}
          loading="lazy"
          gridPosition={index + 1}
        />
      ))}
    </S.GalleryContainer>
  );
};

export default RestaurantGallery;
