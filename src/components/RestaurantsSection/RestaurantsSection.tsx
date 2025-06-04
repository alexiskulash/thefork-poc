import React from 'react';
import Text from '@/design-system/Text/Text';
import Button from '@/design-system/Button/Button';
import RestaurantCard from '@/design-system/RestaurantCard/RestaurantCard';
import { Restaurant } from '@/types/api';
import * as S from './RestaurantsSection.styles';

type RestaurantsSectionProps = {
  title: string;
  restaurants: Restaurant[];
  onSeeMore?: () => void;
};

const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({
  title,
  restaurants,
  onSeeMore,
}) => {
  return (
    <S.Container>
      <S.Header>
        <Text variant="t1" weight="bold">
          {title}
        </Text>
        {onSeeMore && (
          <Button hierarchy="tertiary" size="s" onClick={onSeeMore}>
            See more
          </Button>
        )}
      </S.Header>
      <S.RestaurantsList>
        {restaurants.slice(0, 3).map((restaurant) => (
          <S.RestaurantCardWrapper key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </S.RestaurantCardWrapper>
        ))}
      </S.RestaurantsList>
    </S.Container>
  );
};

export default RestaurantsSection;
