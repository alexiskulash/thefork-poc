import React from 'react';
import { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import Link from 'next/link';

import { Container, containerPaddingStyle } from '@/components/Container';
import SEO from '@/components/SEO';
import { TopRestaurantResult } from '@/types/api';
import Callout from '@/design-system/Callout/Callout';
import Spinner from '@/design-system/Spinner/Spinner';
import { HStack, VStack } from '@/design-system/Stack/Stack';
import TopRestaurantsList from '@/components/TopRestaurantsList/TopRestaurantsList';
import { Heading } from '@/design-system/Heading/Heading.styles';
import Button from '@/design-system/Button/Button';

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
        }
      }
    }
  }
`;

type GetHomePageDataQuery = {
  getTopRestaurants: [TopRestaurantResult];
};

const StyledHeading = styled(Heading)`
  ${containerPaddingStyle}
`;

const HomagePage: NextPage = () => {
  const { loading, error, data } =
    useQuery<GetHomePageDataQuery>(GET_HOME_PAGE_DATA);

  return (
    <React.Fragment>
      <SEO
        title="Find the best restaurants"
        description="Find and book the best restaurants at TheFork."
        canonical={`https://www.thefork.com/`}
      />
      <Container>
        {error ? (
          <Callout
            collapsible={false}
            intent="alert"
            description="Error loading data. Please try again later."
          />
        ) : loading ? (
          <HStack horizontalAlign="center">
            <Spinner aria-label="Loading the city information..." size="l" />
          </HStack>
        ) : (
          <React.Fragment>
            <VStack spacing="coreSpacing09">
              <div style={{ textAlign: 'center' }}>
                <VStack spacing="coreSpacing05">
                  <StyledHeading variant="h1">
                    Discover our restaurants
                  </StyledHeading>
                  <Link href="/samples" passHref>
                    <Button hierarchy="secondary">View Design Samples</Button>
                  </Link>
                </VStack>
              </div>

              <div>
                {data?.getTopRestaurants.map((results) => (
                  <TopRestaurantsList
                    key={results.city.id}
                    restaurants={results.restaurants}
                    city={results.city}
                  />
                ))}
              </div>
            </VStack>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};

export default HomagePage;
