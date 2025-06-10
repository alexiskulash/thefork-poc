import React from 'react';

import { City } from '@/types/api';
import CityCard from '@/design-system/CityCard/CityCard';

import * as S from './ExploreCities.styles';

type ExploreCitiesProps = {
  cities: City[];
};

const ExploreCities: React.FC<ExploreCitiesProps> = ({ cities }) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Explore our cities</S.Title>
      </S.Header>
      <S.CitiesScroll>
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </S.CitiesScroll>
    </S.Wrapper>
  );
};

export default ExploreCities;
