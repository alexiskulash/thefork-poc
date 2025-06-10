import React from 'react';

import { City, Restaurant } from '@/types/api';
import CityRestaurantCard from './CityRestaurantCard';

import * as S from './CityRestaurantList.styles';

type CityRestaurantListProps = {
  restaurants: Restaurant[];
  cityName: City['name'];
};

const CityRestaurantList: React.FC<CityRestaurantListProps> = ({
  restaurants,
  cityName,
}) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Restaurants in {cityName}</S.Title>
      </S.Header>
      <S.RestaurantsList>
        {restaurants.map((restaurant) => (
          <CityRestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </S.RestaurantsList>
    </S.Wrapper>
  );
};

export default CityRestaurantList;
