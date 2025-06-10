import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

import SEO from '@/components/SEO';
import { City, Restaurant } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import Button from '@/design-system/Button/Button';
import { ChevronLeft } from '@/design-system/icons';
import CityRestaurantList from '@/components/CityRestaurantList/CityRestaurantList';
import ExploreCities from '@/components/ExploreCities/ExploreCities';

// Import fallback data
import DATA from '@/pages/api/data.json';

export const GET_CITY_PAGE_DATA = gql`
  query GetCityPageData($cityID: ID!) {
    getRestaurants(cityID: $cityID) {
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
    getCities {
      id
      name
      photo
    }
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  if (typeof query.cityID !== 'string') {
    return {
      notFound: true,
    };
  }

  return {
    props: { cityID: query.cityID },
  };
};

type CityPageProps = { cityID: string };

type GetCityPageDataQuery = {
  getRestaurants: Restaurant[];
  getCities: City[];
};

// Styled components for mobile-first design
const PageContainer = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: 24px;
  min-height: 100vh;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 16px;
  padding-bottom: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

// Fallback data functions
const getFallbackCityData = (cityID: string) => {
  try {
    const numericCityID = parseInt(cityID, 10);
    const city = DATA.cities.find((c) => c.id === numericCityID);

    if (!city) return null;

    const cityRestaurants = DATA.restaurantsByCities.find(
      (rc) => rc.cityId === numericCityID
    );

    return {
      city,
      restaurants: cityRestaurants?.restaurants || [],
      cities: DATA.cities,
    };
  } catch (error) {
    console.error('Error loading fallback city data:', error);
    return null;
  }
};

const CityPage: NextPage<CityPageProps> = ({ cityID }) => {
  const router = useRouter();

  // GraphQL query with timeout protection
  const { loading, error, data } = useQuery<GetCityPageDataQuery>(
    GET_CITY_PAGE_DATA,
    {
      variables: { cityID },
      timeout: 3000,
      errorPolicy: 'all',
    }
  );

  // Use GraphQL data or fallback to local data
  let cities: City[] = [];
  let currentCity: City | undefined;
  let restaurants: Restaurant[] = [];

  if (data && !error) {
    // Use GraphQL data
    cities = data.getCities || [];
    currentCity = cities.find((city) => city.id === cityID);
    restaurants = data.getRestaurants || [];
  } else {
    // Use fallback data
    const fallbackData = getFallbackCityData(cityID);
    if (fallbackData) {
      cities = fallbackData.cities;
      currentCity = fallbackData.city;
      restaurants = fallbackData.restaurants;
    }
  }

  const otherCities = cities.filter((city) => city.id !== currentCity?.id);

  const pageTitle = currentCity
    ? `Restaurants in ${currentCity.name}`
    : 'Loading...';
  const pageDescription = currentCity
    ? `Discover the best restaurants in ${currentCity.name}. Book a table online at TheFork.`
    : 'Find and book the best restaurants at TheFork.';

  const isLoading = loading && !currentCity;
  const hasError = error && !currentCity;

  return (
    <React.Fragment>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://www.thefork.com/city/${cityID}`}
        ogImage={currentCity?.photo}
      />
      <PageContainer>
        {hasError ? (
          <LoadingContainer>
            <Callout
              collapsible={false}
              intent="alert"
              description="Error loading data. Please try again later."
            />
          </LoadingContainer>
        ) : isLoading ? (
          <LoadingContainer>
            <HStack horizontalAlign="center">
              <Spinner aria-label="Loading the city information..." size="l" />
            </HStack>
          </LoadingContainer>
        ) : currentCity ? (
          <React.Fragment>
            <Header>
              <Button
                hierarchy="tertiary"
                leadingIcon={() => <ChevronLeft />}
                onClick={() => router.back()}
              />
            </Header>
            <ExploreCities cities={otherCities} />
            <CityRestaurantList
              restaurants={restaurants}
              cityName={currentCity.name}
            />
          </React.Fragment>
        ) : (
          <LoadingContainer>
            <Callout
              collapsible={false}
              intent="warning"
              description="City not found. Please select a different city."
            />
          </LoadingContainer>
        )}
      </PageContainer>
    </React.Fragment>
  );
};

export default CityPage;
