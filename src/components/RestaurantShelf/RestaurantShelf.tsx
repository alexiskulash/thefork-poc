import React from 'react';
import Link from 'next/link';

import Text from '@/design-system/Text/Text';
import Button from '@/design-system/Button/Button';
import RestaurantCard from '@/design-system/RestaurantCard/RestaurantCard';
import { City, Restaurant } from '@/types/api';
import * as S from './RestaurantShelf.styles';

type RestaurantShelfProps = {
  restaurants: Restaurant[];
  city: City;
};

const RestaurantShelf: React.FC<RestaurantShelfProps> = ({
  restaurants,
  city,
}) => {
  const handleSeeMore = () => {
    // Navigate to city page
    window.location.href = `/city/${city.id}`;
  };

  // Show only first 3 restaurants for the horizontal scroll
  const displayRestaurants = restaurants.slice(0, 3);

  return (
    <S.SectionWrapper>
      <S.SectionHeader>
        <S.SectionTitle>
          <h2>Best restaurants in {city.name}</h2>
        </S.SectionTitle>
        <S.SeeMoreButton>
          <Button hierarchy="ghost-compact" size="m" onClick={handleSeeMore}>
            See more
          </Button>
        </S.SeeMoreButton>
      </S.SectionHeader>
      <S.RestaurantsList>
        {displayRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </S.RestaurantsList>
    </S.SectionWrapper>
  );
};

export default RestaurantShelf;
