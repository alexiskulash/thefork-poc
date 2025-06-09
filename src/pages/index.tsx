import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { Container, containerPaddingStyle } from '@/components/Container';
import SEO from '@/components/SEO';
import { TopRestaurantResult, City, Restaurant } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import { Heading } from '@/design-system/Heading/Heading.styles';
import Button from '@/design-system/Button/Button';
import ButtonDock from '@/design-system/ButtonDock/ButtonDock';
import RestaurantShelf from '@/components/RestaurantShelf/RestaurantShelf';
import DATA from '@/pages/api/data.json';

export const GET_HOME_PAGE_DATA = gql`
  query GetHomePageData {
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
          reviewCount
        }
        address {
          locality
          street
          country
          zipCode
        }
        averagePrice {
          value
          currency
        }
        bestOffer
      }
    }
  }
`;

type GetHomePageDataQuery = {
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
`;

const MainContent = styled.div`
  padding: ${({ theme }) => theme.space.coreSpacing11} 21px 120px 21px; /* Extra bottom padding to account for sticky button */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing09};
`;

const PageTitle = styled.h1`
  align-self: stretch;
  font-family:
    'Montserrat',
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 130%;
  color: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  margin: 0;
`;

const ShelvesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing08};
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

const HomePage: NextPage = () => {
  const { loading, error, data } = useQuery<GetHomePageDataQuery>(
    GET_HOME_PAGE_DATA,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    }
  );

  const handleExploreCities = () => {
    // Navigate to cities page
    window.location.href = '/cities';
  };

  // Create fallback data from the local JSON file
  const getFallbackData = (): TopRestaurantResult[] => {
    return DATA.restaurantsByCities.map((results) => {
      const city = DATA.cities.find((city) => {
        return results.cityId === city.id;
      });

      return {
        city: city as City,
        restaurants: results.restaurants.slice(0, 3) as Restaurant[],
      };
    });
  };

  // Use GraphQL data if available, otherwise fallback to local data
  const restaurantData = data?.getTopRestaurants || getFallbackData();

  // Debug logging
  console.log('HomePage render:', { loading, error, data, restaurantData });

  useEffect(() => {
    console.log('useEffect - Apollo state:', { loading, error, data });
    if (error) {
      console.error('GraphQL Error Details:', error);
      console.log('Using fallback data instead');
    }
  }, [loading, error, data]);

  return (
    <React.Fragment>
      <SEO
        title="Find the best restaurants"
        description="Find and book the best restaurants at TheFork."
        canonical={`https://www.thefork.com/`}
      />
      <PageContainer>
        {error && !restaurantData?.length ? (
          <MainContent>
            <Callout
              collapsible={false}
              intent="alert"
              description={`Error loading data: ${error.message}. Please try again later.`}
            />
          </MainContent>
        ) : loading && !restaurantData?.length ? (
          <MainContent>
            <HStack horizontalAlign="center">
              <Spinner aria-label="Loading the city information..." size="l" />
            </HStack>
          </MainContent>
        ) : (
          <React.Fragment>
            <MainContent>
              <PageTitle as="h1">Discover our restaurants</PageTitle>
              <ShelvesContainer>
                {restaurantData?.length ? (
                  restaurantData.map((results) => (
                    <RestaurantShelf
                      key={results.city.id}
                      restaurants={results.restaurants}
                      city={results.city}
                    />
                  ))
                ) : (
                  <div>No restaurant data available</div>
                )}
              </ShelvesContainer>
            </MainContent>
            <StyledButtonDock>
              <Button
                hierarchy="secondary"
                size="l"
                fillContainer={true}
                onClick={handleExploreCities}
              >
                Explore cities
              </Button>
            </StyledButtonDock>
          </React.Fragment>
        )}
      </PageContainer>
    </React.Fragment>
  );
};

export default HomePage;
