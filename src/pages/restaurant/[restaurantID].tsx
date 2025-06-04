import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import { Container, containerPaddingStyle } from '@/components/Container';
import SEO from '@/components/SEO';
import RestaurantPhotoGrid from '@/components/RestaurantPhotoGrid/RestaurantPhotoGrid';
import RestaurantInfo from '@/components/RestaurantInfo/RestaurantInfo';
import RestaurantsSection from '@/components/RestaurantsSection/RestaurantsSection';
import { Restaurant, TopRestaurantResult } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import Button from '@/design-system/Button/Button';
import ButtonDock from '@/design-system/ButtonDock/ButtonDock';
import { ArrowLeft } from '@/design-system/icons';

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
  display: flex;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 14.75px;
  border-radius: ${({ theme }) => theme.radii.coreRadiusXl};
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space.coreSpacing11} 21px
    ${({ theme }) => theme.space.coreSpacing08} 21px;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space.coreSpacing08};
  flex: 1;
`;

const BackButtonContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.coreSpacing06};
`;

const PhotoGridContainer = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.coreSpacing06};
`;

const BottomDock = styled.div`
  display: flex;
  width: 100%;
  padding: ${({ theme }) => theme.space.coreSpacing05} 21px
    ${({ theme }) => theme.space.coreSpacing09} 21px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  background: ${({ theme }) =>
    theme.colors.semanticColorsModalPrimaryBackgroundColor};
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

const RestaurantPage: NextPage<RestaurantPageProps> = ({ restaurantID }) => {
  const router = useRouter();

  const { loading, error, data } = useQuery<GetRestaurantDataQuery>(
    GET_RESTAURANT_PAGE_DATA,
    {
      variables: { restaurantID },
    }
  );

  const restaurant = data?.getRestaurant;
  const topRestaurantsResults = data?.getTopRestaurants.find(({ city }) => {
    return city.name === restaurant?.address.locality;
  });
  const restaurantCity = topRestaurantsResults?.city;
  const otherRestaurants = topRestaurantsResults?.restaurants;

  const pageTitle = restaurant
    ? `Restaurant - ${restaurant.name}`
    : 'Loading...';
  const pageDescription = restaurant
    ? `Discover the restaurant ${restaurant.name}. Book a table online at TheFork.`
    : 'Find and book the best restaurants at TheFork.';

  // Mock restaurant images for the photo grid
  const restaurantImages = [
    restaurant?.photo || '',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/f31b5d7066a0c5a4b9b0e27dc88b542a01044f02?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/ed309d64343beffcb0d1399c3e6984b5198f9ab1?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/9f7cfb1f17778699304f42f12bfbe13b0044eafe?placeholderIfAbsent=true',
    'https://cdn.builder.io/api/v1/image/assets/TEMP/dc1f2c5a3f1aa49b5a58945a45aae30af2d54fc3?placeholderIfAbsent=true',
  ].filter(Boolean);

  const handleSeeMoreRestaurants = () => {
    if (restaurantCity) {
      router.push(`/city/${restaurantCity.id}`);
    }
  };

  const handleBookNow = () => {
    // Handle booking logic here
    console.log('Book now clicked for restaurant:', restaurant?.name);
  };

  return (
    <React.Fragment>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.thefork.com/resturant/${restaurantID}`}
        ogImage={restaurant?.photo}
      />
      <PageContainer>
        {error ? (
          <Container>
            <Callout
              collapsible={false}
              intent="alert"
              description="Error loading data. Please try again later."
            />
          </Container>
        ) : loading ? (
          <Container>
            <HStack horizontalAlign="center">
              <Spinner
                aria-label="Loading the restaurant information..."
                size="l"
              />
            </HStack>
          </Container>
        ) : restaurant ? (
          <React.Fragment>
            <MainContent>
              <BackButtonContainer>
                <Button
                  hierarchy="tertiary"
                  size="s"
                  leadingIcon={() => <ArrowLeft size="s" />}
                  onClick={() => router.back()}
                  style={{
                    width: '36px',
                    minHeight: '36px',
                    padding: '0px 8px',
                    borderRadius: '62.5rem',
                    border: `1px solid ${data?.getRestaurant ? 'rgba(73,91,105,1)' : 'transparent'}`,
                    background: 'hsla(0, 0%, 100%, 0)',
                  }}
                />
              </BackButtonContainer>

              <PhotoGridContainer>
                <RestaurantPhotoGrid
                  images={restaurantImages}
                  restaurantName={restaurant.name}
                />
              </PhotoGridContainer>

              <RestaurantInfo restaurant={restaurant} />

              {otherRestaurants && otherRestaurants.length > 0 && (
                <RestaurantsSection
                  title={`More restaurants in ${restaurant.address.locality}`}
                  restaurants={otherRestaurants.filter(
                    (r) => r.id !== restaurant.id
                  )}
                  onSeeMore={handleSeeMoreRestaurants}
                />
              )}
            </MainContent>

            <BottomDock>
              <Button
                hierarchy="primary"
                size="m"
                fillContainer
                onClick={handleBookNow}
              >
                Book now
              </Button>
            </BottomDock>
          </React.Fragment>
        ) : (
          <Container>
            <Callout
              collapsible={false}
              intent="warning"
              description="Restaurant not found. Please select a different restaurant."
            />
          </Container>
        )}
      </PageContainer>
    </React.Fragment>
  );
};

export default RestaurantPage;
