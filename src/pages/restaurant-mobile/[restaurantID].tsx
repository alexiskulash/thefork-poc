import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';

import SEO from '@/components/SEO';
import RestaurantInfo from '@/components/RestaurantInfo/RestaurantInfo';
import { Restaurant, TopRestaurantResult } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import styled from '@emotion/styled';

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

type RestaurantMobilePageProps = { restaurantID: string };

type GetRestaurantDataQuery = {
  getRestaurant: Restaurant;
  getTopRestaurants: [TopRestaurantResult];
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPageSecondaryBackgroundColor};
  padding: ${({ theme }) => theme.space.coreSpacing04};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 390px;
  height: 822px;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: 24px;
`;

const RestaurantMobilePage: NextPage<RestaurantMobilePageProps> = ({
  restaurantID,
}) => {
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
  const otherRestaurants = topRestaurantsResults?.restaurants?.filter(
    (r) => r.id !== restaurant?.id
  );

  const pageTitle = restaurant
    ? `Restaurant - ${restaurant.name}`
    : 'Loading...';
  const pageDescription = restaurant
    ? `Discover the restaurant ${restaurant.name}. Book a table online at TheFork.`
    : 'Find and book the best restaurants at TheFork.';

  return (
    <React.Fragment>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.thefork.com/restaurant-mobile/${restaurantID}`}
        ogImage={restaurant?.photo}
      />
      <PageContainer>
        {error ? (
          <LoadingContainer>
            <Callout
              collapsible={false}
              intent="alert"
              description="Error loading data. Please try again later."
            />
          </LoadingContainer>
        ) : loading ? (
          <LoadingContainer>
            <Spinner
              aria-label="Loading the restaurant information..."
              size="l"
            />
          </LoadingContainer>
        ) : restaurant ? (
          <RestaurantInfo
            restaurant={restaurant}
            relatedRestaurants={otherRestaurants}
            cityName={restaurantCity?.name}
          />
        ) : (
          <LoadingContainer>
            <Callout
              collapsible={false}
              intent="warning"
              description="Restaurant not found. Please select a different restaurant."
            />
          </LoadingContainer>
        )}
      </PageContainer>
    </React.Fragment>
  );
};

export default RestaurantMobilePage;
