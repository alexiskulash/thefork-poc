import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/design-system/Button/Button';
import Text from '@/design-system/Text/Text';
import RestaurantCard from '@/design-system/RestaurantCard/RestaurantCard';
import { ArrowLeft, Rating, MapPin, Price, Cover } from '@/design-system/icons';
import RestaurantGallery from '../RestaurantGallery/RestaurantGallery';
import MobileButtonDock from '../MobileButtonDock/MobileButtonDock';
import { Restaurant } from '@/types/api';
import * as S from './RestaurantInfo.styles';

interface RestaurantInfoProps {
  restaurant: Restaurant;
  relatedRestaurants?: Restaurant[];
  cityName?: string;
}

/**
 * Mobile restaurant information page component
 * Displays restaurant details, gallery, and related restaurants
 */
const RestaurantInfo: React.FC<RestaurantInfoProps> = ({
  restaurant,
  relatedRestaurants = [],
  cityName = 'Paris',
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleBookNow = () => {
    // Implement booking logic here
    console.log('Book now clicked for restaurant:', restaurant.id);
  };

  const getFoodType = (restaurantName: string): string => {
    const foodTypes: Record<string, string> = {
      'Culinary Haven': 'Modern European',
      'Spice Route': 'Indian Cuisine',
      'Bella Vista': 'Italian',
      'Ocean Breeze': 'Seafood & Mediterranean',
    };
    return foodTypes[restaurantName] || 'International';
  };

  const restaurantImages = restaurant.photo ? [restaurant.photo] : [];
  // Add sample images for demo purposes
  const sampleImages = [
    restaurant.photo ||
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9f2d2619487f80c31704661e7a8116d71b6f87fc?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/f31b5d7066a0c5a4b9b0e27dc88b542a01044f02?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/ed309d64343beffcb0d1399c3e6984b5198f9ab1?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/9f7cfb1f17778699304f42f12bfbe13b0044eafe?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/dc1f2c5a3f1aa49b5a58945a45aae30af2d54fc3?placeholderIfAbsent=true',
  ];

  return (
    <S.PageContainer>
      <S.ContentContainer>
        <S.BackButtonContainer>
          <Button
            hierarchy="tertiary"
            size="s"
            leadingIcon={() => <ArrowLeft size="s" />}
            onClick={handleBackClick}
          />
        </S.BackButtonContainer>

        <RestaurantGallery images={sampleImages} alt={restaurant.name} />

        <S.RestaurantDetailsSection>
          <S.RestaurantHeader>
            <S.RestaurantTitle>{restaurant.name}</S.RestaurantTitle>
            {restaurant.aggregateRatings?.ratingValue && (
              <S.RatingContainer>
                <Rating variant="filled" size="m" />
                <Text variant="t1" weight="bold">
                  {restaurant.aggregateRatings.ratingValue}
                </Text>
              </S.RatingContainer>
            )}
          </S.RestaurantHeader>

          <S.RestaurantMetadata>
            <S.MetadataRow>
              <MapPin size="s" />
              <S.AddressContainer>
                <Text variant="t2" color="secondary">
                  {restaurant.address.street}
                </Text>
                <Text variant="t2" color="secondary">
                  ,
                </Text>
                <Text variant="t2" color="secondary">
                  {restaurant.address.zipCode}
                </Text>
                <Text variant="t2" color="secondary">
                  ,
                </Text>
                <Text variant="t2" color="secondary">
                  {restaurant.address.locality}
                </Text>
                <Text variant="t2" color="secondary">
                  ,
                </Text>
                <Text variant="t2" color="secondary">
                  {restaurant.address.country}
                </Text>
              </S.AddressContainer>
            </S.MetadataRow>

            {restaurant.averagePrice && (
              <S.MetadataRow>
                <Price size="s" />
                <S.PriceContainer>
                  <Text variant="t2" color="secondary">
                    ≈
                  </Text>
                  <Text variant="t2" color="secondary">
                    {restaurant.averagePrice.value}
                  </Text>
                  <Text variant="t2" color="secondary">
                    {restaurant.averagePrice.currency}
                  </Text>
                </S.PriceContainer>
              </S.MetadataRow>
            )}

            <S.MetadataRow>
              <Cover size="s" />
              <Text variant="t2" color="secondary">
                {getFoodType(restaurant.name)}
              </Text>
            </S.MetadataRow>
          </S.RestaurantMetadata>
        </S.RestaurantDetailsSection>

        {relatedRestaurants.length > 0 && (
          <S.RelatedRestaurantsSection>
            <S.SectionHeader>
              <Text variant="t1" weight="bold">
                More restaurants in {cityName}
              </Text>
              <Button hierarchy="tertiary" size="s">
                <S.SeeMoreText>See more</S.SeeMoreText>
              </Button>
            </S.SectionHeader>

            <S.RestaurantList>
              {relatedRestaurants.slice(0, 3).map((relatedRestaurant) => (
                <S.RestaurantCardWrapper key={relatedRestaurant.id}>
                  <RestaurantCard restaurant={relatedRestaurant} />
                </S.RestaurantCardWrapper>
              ))}
            </S.RestaurantList>
          </S.RelatedRestaurantsSection>
        )}
      </S.ContentContainer>

      <MobileButtonDock>
        <Button hierarchy="primary" fillContainer onClick={handleBookNow}>
          Book now
        </Button>
      </MobileButtonDock>
    </S.PageContainer>
  );
};

export default RestaurantInfo;
