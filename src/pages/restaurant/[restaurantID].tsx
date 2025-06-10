import React, { useState, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import SEO from '@/components/SEO';
import RestaurantShelf from '@/components/RestaurantShelf/RestaurantShelf';
import { Restaurant, TopRestaurantResult, City } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import Button from '@/design-system/Button/Button';
import ButtonDock from '@/design-system/ButtonDock/ButtonDock';
import {
  ChevronLeft,
  Rating,
  MapPin,
  Price,
  Cover,
} from '@/design-system/icons';
import DATA from '@/pages/api/data.json';

export const GET_RESTAURANT_PAGE_DATA = gql`
  query GetRestaurantPageData($restaurantID: ID!) {
    getRestaurant(restaurantID: $restaurantID) {
      id
      slug
      name
      photo
      bestOffer
      address {
        street
        zipCode
        locality
        country
      }
      averagePrice {
        value
        currency
      }
      aggregateRatings {
        ratingValue
        reviewCount
      }
    }
    getTopRestaurants {
      city {
        id
        name
        photo
      }
      restaurants {
        id
        slug
        name
        photo
        aggregateRatings {
          ratingValue
        }
        address {
          locality
          street
          country
        }
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (typeof query.restaurantID !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: { restaurantID: query.restaurantID },
  };
};

type RestaurantPageProps = { restaurantID: string };

type GetRestaurantDataQuery = {
  getRestaurant: Restaurant;
  getTopRestaurants: [TopRestaurantResult];
};

const PageContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: 24px;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14.75px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.coreSpacing11} 21px 120px 21px;
  gap: ${({ theme }) => theme.space.coreSpacing08};
  flex: 1;
`;

const BackButton = styled(Button)`
  width: 36px;
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.coreRadiusPill};
  border: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderStrongColor};
  background: ${({ theme }) => theme.colors.semanticSurfacesTransparentDefault};
`;

const PhotoGallery = styled.div`
  display: grid;
  height: 174px;
  gap: 4px;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
`;

const MainPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
`;

const GalleryPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.coreRadiusS};
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing06};
`;

const RestaurantHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing06};
`;

const RestaurantName = styled.h1`
  flex: 1 0 0;
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 130%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  margin: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  padding-top: ${({ theme }) => theme.space.coreSpacing02};
  align-items: center;
  gap: 4px;
`;

const RatingText = styled.span`
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
`;

const RestaurantDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing04};
`;

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.coreSpacing02};
  flex: 1 0 0;
`;

const DetailText = styled.span`
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.semanticColorsTextSecondary};
`;

const StyledButtonDock = styled(ButtonDock)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.space.coreSpacing05} 21px
    ${({ theme }) => theme.space.coreSpacing09} 21px;
  border: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  background: ${({ theme }) =>
    theme.colors.semanticColorsModalPrimaryBackgroundColor};
  border-radius: 0 0 24px 24px;

  button {
    font-family:
      'Montserrat',
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.semanticColorsTextPrimaryInverse};
  }
`;

const RestaurantPage: NextPage<RestaurantPageProps> = ({ restaurantID }) => {
  const router = useRouter();
  const [useFallback, setUseFallback] = useState(false);

  // Try GraphQL query but handle errors gracefully
  const { loading, error, data } = useQuery<GetRestaurantDataQuery>(
    GET_RESTAURANT_PAGE_DATA,
    {
      variables: { restaurantID },
      errorPolicy: 'all',
      onError: (apolloError) => {
        console.warn(
          'GraphQL query failed, using fallback data:',
          apolloError.message
        );
        setUseFallback(true);
      },
      skip: useFallback,
    }
  );

  // Create fallback data from local JSON
  const getFallbackData = (): {
    restaurant: Restaurant | null;
    cityData: TopRestaurantResult | null;
  } => {
    try {
      let foundRestaurant: Restaurant | null = null;
      let foundCityData: TopRestaurantResult | null = null;

      // Find the restaurant in the data
      DATA.restaurantsByCities.forEach((cityRestaurants) => {
        const restaurant = cityRestaurants.restaurants.find(
          (r) => r.id === restaurantID
        );
        if (restaurant) {
          foundRestaurant = restaurant as Restaurant;

          // Find the city data
          const city = DATA.cities.find((c) => c.id === cityRestaurants.cityId);
          if (city) {
            foundCityData = {
              city: city as City,
              restaurants: cityRestaurants.restaurants
                .filter((r) => r.id !== restaurantID)
                .slice(0, 3) as Restaurant[],
            };
          }
        }
      });

      return { restaurant: foundRestaurant, cityData: foundCityData };
    } catch (error) {
      console.error('Error creating fallback data:', error);
      return { restaurant: null, cityData: null };
    }
  };

  const fallbackData = getFallbackData();

  // Determine which data to use
  const restaurant = data?.getRestaurant || fallbackData.restaurant;
  const topRestaurantsResults =
    data?.getTopRestaurants?.find(({ city }) => {
      return city.name === restaurant?.address.locality;
    }) || fallbackData.cityData;

  const restaurantCity = topRestaurantsResults?.city;
  const otherRestaurants = topRestaurantsResults?.restaurants;

  // Auto-fallback after timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && !data && !useFallback) {
        console.log('GraphQL query timeout, switching to fallback data');
        setUseFallback(true);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [loading, data, useFallback]);

  const handleBack = () => {
    router.back();
  };

  const handleBookNow = () => {
    // Handle booking logic
    console.log('Booking restaurant:', restaurant?.name);
  };

  const handleSeeMoreRestaurants = () => {
    if (restaurantCity) {
      router.push(`/city/${restaurantCity.id}`);
    }
  };

  // Format price
  const formatPrice = (value: number, currency: string) => {
    return `≈ ${(value / 100).toFixed(0)} ${currency}`;
  };

  // Format address
  const formatAddress = (address: any) => {
    return [address.street, address.zipCode, address.locality, address.country]
      .filter(Boolean)
      .join(', ');
  };

  const pageTitle = restaurant
    ? `Restaurant - ${restaurant.name}`
    : 'Loading...';
  const pageDescription = restaurant
    ? `Discover the restaurant ${restaurant.name}. Book a table online at TheFork.`
    : 'Find and book the best restaurants at TheFork.';

  console.log('Restaurant page state:', {
    loading,
    hasError: !!error,
    hasData: !!data,
    useFallback,
    hasRestaurant: !!restaurant,
    restaurantName: restaurant?.name,
  });

  if (loading && !restaurant) {
    return (
      <PageContainer>
        <MainContent>
          <HStack horizontalAlign="center">
            <Spinner aria-label="Loading restaurant information..." size="l" />
          </HStack>
        </MainContent>
      </PageContainer>
    );
  }

  if (!restaurant) {
    return (
      <PageContainer>
        <MainContent>
          <Callout
            collapsible={false}
            intent="warning"
            description="Restaurant not found. Please select a different restaurant."
          />
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <React.Fragment>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.thefork.com/restaurant/${restaurantID}`}
        ogImage={restaurant.photo}
      />
      <PageContainer>
        <MainContent>
          <BackButton
            hierarchy="tertiary"
            size="m"
            leadingIcon={(iconSize) => <ChevronLeft size={iconSize} />}
            onClick={handleBack}
          />

          <PhotoGallery>
            <MainPhoto src={restaurant.photo} alt={restaurant.name} />
            <GalleryPhoto
              style={{ gridRow: '1 / span 1', gridColumn: '3 / span 1' }}
              src={restaurant.photo}
              alt={`${restaurant.name} - Gallery 1`}
            />
            <GalleryPhoto
              style={{ gridRow: '1 / span 1', gridColumn: '4 / span 1' }}
              src={restaurant.photo}
              alt={`${restaurant.name} - Gallery 2`}
            />
            <GalleryPhoto
              style={{ gridRow: '2 / span 1', gridColumn: '3 / span 1' }}
              src={restaurant.photo}
              alt={`${restaurant.name} - Gallery 3`}
            />
            <GalleryPhoto
              style={{ gridRow: '2 / span 1', gridColumn: '4 / span 1' }}
              src={restaurant.photo}
              alt={`${restaurant.name} - Gallery 4`}
            />
          </PhotoGallery>

          <RestaurantInfo>
            <RestaurantHeader>
              <RestaurantName>{restaurant.name}</RestaurantName>
              {restaurant.aggregateRatings && (
                <RatingContainer>
                  <Rating variant="filled" size="m" />
                  <RatingText>
                    {restaurant.aggregateRatings.ratingValue}
                  </RatingText>
                </RatingContainer>
              )}
            </RestaurantHeader>

            <RestaurantDetails>
              <DetailRow>
                <MapPin size="s" />
                <DetailContent>
                  <DetailText>{formatAddress(restaurant.address)}</DetailText>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <Price size="s" />
                <DetailContent>
                  <DetailText>
                    {formatPrice(
                      restaurant.averagePrice.value,
                      restaurant.averagePrice.currency
                    )}
                  </DetailText>
                </DetailContent>
              </DetailRow>

              <DetailRow>
                <Cover size="s" />
                <DetailContent>
                  <DetailText>European Cuisine</DetailText>
                </DetailContent>
              </DetailRow>
            </RestaurantDetails>
          </RestaurantInfo>

          {otherRestaurants && restaurantCity && (
            <RestaurantShelf
              restaurants={otherRestaurants}
              city={restaurantCity}
              title={`More restaurants in ${restaurantCity.name}`}
            />
          )}
        </MainContent>

        <StyledButtonDock>
          <Button
            hierarchy="primary"
            size="l"
            fillContainer={true}
            onClick={handleBookNow}
          >
            Book now
          </Button>
        </StyledButtonDock>
      </PageContainer>
    </React.Fragment>
  );
};

export default RestaurantPage;
