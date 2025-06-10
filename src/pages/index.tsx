import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import SEO from '@/components/SEO';
import { TopRestaurantResult, City, Restaurant } from '@/types/api';
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
  const [useFallback, setUseFallback] = useState(false);

  // Try GraphQL query but handle errors gracefully
  const { loading, error, data } = useQuery<GetHomePageDataQuery>(
    GET_HOME_PAGE_DATA,
    {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      onError: (apolloError) => {
        console.warn(
          'GraphQL query failed, using fallback data:',
          apolloError.message
        );
        setUseFallback(true);
      },
      // Skip if we already decided to use fallback
      skip: useFallback,
    }
  );

  const handleExploreCities = () => {
    // Navigate to cities page
    window.location.href = '/cities';
  };

  // Create fallback data from the local JSON file
  const getFallbackData = (): TopRestaurantResult[] => {
    try {
      return DATA.restaurantsByCities
        .map((results) => {
          const city = DATA.cities.find((city) => {
            return results.cityId === city.id;
          });

          if (!city) {
            console.warn(`City not found for cityId: ${results.cityId}`);
            return null;
          }

          return {
            city: city as City,
            restaurants: results.restaurants.slice(0, 3) as Restaurant[],
          };
        })
        .filter(Boolean) as TopRestaurantResult[];
    } catch (error) {
      console.error('Error creating fallback data:', error);
      return [];
    }
  };

  // Determine which data to use
  const restaurantData = React.useMemo(() => {
    if (data?.getTopRestaurants && !error) {
      console.log('Using GraphQL data');
      return data.getTopRestaurants;
    } else {
      console.log('Using fallback data');
      return getFallbackData();
    }
  }, [data, error]);

  // Auto-fallback after timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && !data && !useFallback) {
        console.log('GraphQL query timeout, switching to fallback data');
        setUseFallback(true);
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeout);
  }, [loading, data, useFallback]);

  console.log('HomePage state:', {
    loading,
    hasError: !!error,
    hasData: !!data,
    useFallback,
    restaurantDataCount: restaurantData.length,
  });

  return (
    <React.Fragment>
      <SEO
        title="Find the best restaurants"
        description="Find and book the best restaurants at TheFork."
        canonical={`https://www.thefork.com/`}
      />
      <PageContainer>
        {!restaurantData?.length && loading && !useFallback ? (
          <MainContent>
            <PageTitle>Discover our restaurants</PageTitle>
            <div>Loading restaurants...</div>
          </MainContent>
        ) : !restaurantData?.length ? (
          <MainContent>
            <PageTitle>Discover our restaurants</PageTitle>
            <div>No restaurant data available</div>
          </MainContent>
        ) : (
          <React.Fragment>
            <MainContent>
              <PageTitle>Discover our restaurants</PageTitle>
              <ShelvesContainer>
                {restaurantData.map((results) => (
                  <RestaurantShelf
                    key={results.city.id}
                    restaurants={results.restaurants}
                    city={results.city}
                  />
                ))}
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
