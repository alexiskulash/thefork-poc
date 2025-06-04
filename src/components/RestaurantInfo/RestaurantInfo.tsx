import React from 'react';
import Text from '@/design-system/Text/Text';
import Heading from '@/design-system/Heading/Heading';
import { Rating, MapPin, Price, Cover } from '@/design-system/icons';
import { Restaurant } from '@/types/api';
import * as S from './RestaurantInfo.styles';

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  const { address, aggregateRatings, averagePrice } = restaurant;

  return (
    <S.Container>
      <S.HeaderSection>
        <Heading variant="h2">{restaurant.name}</Heading>
        {aggregateRatings?.ratingValue && (
          <S.RatingContainer>
            <Rating variant="filled" size="s" />
            <Text variant="t1" weight="bold">
              {aggregateRatings.ratingValue}
            </Text>
          </S.RatingContainer>
        )}
      </S.HeaderSection>

      <S.DetailsSection>
        <S.DetailRow>
          <MapPin size="s" />
          <S.AddressContainer>
            <Text variant="t2" color="semanticColorsTextSecondary">
              {address.street}
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              ,
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              {address.zipCode}
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              ,
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              {address.locality}
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              ,
            </Text>
            <Text variant="t2" color="semanticColorsTextSecondary">
              {address.country}
            </Text>
          </S.AddressContainer>
        </S.DetailRow>

        {averagePrice && (
          <S.DetailRow>
            <Price size="s" />
            <S.PriceContainer>
              <Text variant="t2" color="semanticColorsTextSecondary">
                ≈
              </Text>
              <Text variant="t2" color="semanticColorsTextSecondary">
                {averagePrice.value}
              </Text>
              <Text variant="t2" color="semanticColorsTextSecondary">
                {averagePrice.currency}
              </Text>
            </S.PriceContainer>
          </S.DetailRow>
        )}

        <S.DetailRow>
          <Cover size="s" />
          <S.FoodTypeContainer>
            <Text variant="t2" color="semanticColorsTextSecondary">
              Italian Cuisine
            </Text>
          </S.FoodTypeContainer>
        </S.DetailRow>
      </S.DetailsSection>
    </S.Container>
  );
};

export default RestaurantInfo;
