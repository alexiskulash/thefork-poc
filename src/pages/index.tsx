import React from 'react';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { Container, containerPaddingStyle } from '@/components/Container';
import SEO from '@/components/SEO';
import { TopRestaurantResult } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack } from '@/design-system/Stack/Stack';
import { Heading } from '@/design-system/Heading/Heading.styles';
import Button from '@/design-system/Button/Button';
import ButtonDock from '@/design-system/ButtonDock/ButtonDock';
import RestaurantShelf from '@/components/RestaurantShelf/RestaurantShelf';

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
  padding: ${({ theme }) => theme.space.coreSpacing11} 21px
    ${({ theme }) => theme.space.coreSpacing08} 21px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.coreSpacing09};
`;

const PageTitle = styled(Heading)`
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
  const { loading, error, data } =
    useQuery<GetHomePageDataQuery>(GET_HOME_PAGE_DATA);

  const handleExploreCities = () => {
    // Navigate to cities page
    window.location.href = '/cities';
  };

  return (
    <React.Fragment>
      <SEO
        title="Find the best restaurants"
        description="Find and book the best restaurants at TheFork."
        canonical={`https://www.thefork.com/`}
      />
      <PageContainer>
        {error ? (
          <MainContent>
            <Callout
              collapsible={false}
              intent="alert"
              description="Error loading data. Please try again later."
            />
          </MainContent>
        ) : loading ? (
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
                {data?.getTopRestaurants.map((results) => (
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
