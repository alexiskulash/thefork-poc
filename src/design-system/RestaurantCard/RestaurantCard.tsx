import React from 'react';
import Link from 'next/link';

import { MapPin, Rating } from '@/design-system/icons';
import { Restaurant } from '@/types/api';
import * as S from './RestaurantCard.styles';

type RestaurantCardProps = {
  restaurant: Restaurant;
};

/**
 * Our restaurant card used to represent a restaurant.
 */
const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const ratingValue = restaurant.aggregateRatings?.ratingValue;
  const street = restaurant.address.street;
  const locality = restaurant.address.locality;
  const country = restaurant.address.country;

  // Format the address to match Figma design
  const formattedAddress = [street, locality, country]
    .filter(Boolean)
    .join(', ');

  return (
    <S.Wrapper>
      <S.PhotoWrapper>
        <S.Photo src={restaurant.photo} alt={restaurant.name} />
      </S.PhotoWrapper>
      <S.Content>
        <S.Information>
          <S.Header>
            <h3>
              <Link href={`/restaurant/${restaurant.id}`}>
                {restaurant.name}
              </Link>
            </h3>
            {ratingValue && (
              <S.Rating>
                <Rating variant="filled" size="s" />
                <span>{restaurant.aggregateRatings?.ratingValue}</span>
              </S.Rating>
            )}
          </S.Header>
          {formattedAddress && (
            <S.Address>
              <MapPin size="s" />
              <span>{formattedAddress}</span>
            </S.Address>
          )}
        </S.Information>
      </S.Content>
    </S.Wrapper>
  );
};

export default RestaurantCard;
