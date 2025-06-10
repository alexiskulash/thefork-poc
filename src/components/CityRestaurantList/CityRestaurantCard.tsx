import React from 'react';
import Link from 'next/link';

import { Rating } from '@/design-system/icons';
import { Restaurant } from '@/types/api';
import Button from '@/design-system/Button/Button';

import * as S from './CityRestaurantCard.styles';

type CityRestaurantCardProps = {
  restaurant: Restaurant;
};

const CityRestaurantCard: React.FC<CityRestaurantCardProps> = ({
  restaurant,
}) => {
  const ratingValue = restaurant.aggregateRatings?.ratingValue;
  const street = restaurant.address.street;
  const locality = restaurant.address.locality;

  // Format the address for display
  const formattedAddress = [street, locality].filter(Boolean).join(', ');

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement booking functionality
    console.log(`Book now for ${restaurant.name}`);
  };

  return (
    <S.Card>
      <Link href={`/restaurant/${restaurant.id}`}>
        <S.RestaurantImage src={restaurant.photo} alt={restaurant.name} />
      </Link>

      <S.Content>
        <S.RestaurantInfo>
          <S.RestaurantName>
            <Link href={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </S.RestaurantName>

          {ratingValue && (
            <S.RatingWrapper>
              <Rating variant="filled" size="s" />
              <S.RatingValue>{ratingValue}</S.RatingValue>
            </S.RatingWrapper>
          )}

          {formattedAddress && <S.Address>{formattedAddress}</S.Address>}
        </S.RestaurantInfo>

        <S.BookButtonWrapper>
          <Button
            size="s"
            onClick={handleBookNow}
            aria-label={`Book a table at ${restaurant.name}`}
          >
            Book now
          </Button>
        </S.BookButtonWrapper>
      </S.Content>
    </S.Card>
  );
};

export default CityRestaurantCard;
