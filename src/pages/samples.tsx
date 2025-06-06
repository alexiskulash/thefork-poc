import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import styled from '@emotion/styled';

import SEO from '@/components/SEO';
import { Container } from '@/components/Container';
import Heading from '@/design-system/Heading/Heading';
import Text from '@/design-system/Text/Text';
import Button from '@/design-system/Button/Button';
import { VStack } from '@/design-system/Stack/Stack';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) =>
    theme.colors.semanticColorsPageSecondaryBackgroundColor};
  padding: ${({ theme }) => theme.space.coreSpacing08} 0;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space.coreSpacing11};
`;

const SamplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space.coreSpacing08};
  max-width: 1200px;
  margin: 0 auto;
`;

const SampleCard = styled.div`
  background: ${({ theme }) =>
    theme.colors.semanticColorsPagePrimaryBackgroundColor};
  border-radius: ${({ theme }) => theme.radii.coreRadiusL};
  padding: ${({ theme }) => theme.space.coreSpacing06};
  border: 1px solid
    ${({ theme }) => theme.colors.semanticColorsBorderSubtleColor};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px
      ${({ theme }) => theme.colors.semanticColorsShadowsFloatingAmbientLight};
  }
`;

const SamplePreview = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) =>
    theme.colors.semanticColorsSectionBackgroundColor};
  border-radius: ${({ theme }) => theme.radii.coreRadiusM};
  margin-bottom: ${({ theme }) => theme.space.coreSpacing05};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.semanticColorsAccentColor} 0%,
      ${({ theme }) => theme.colors.semanticColorsPrimaryColor} 100%
    );
    opacity: 0.1;
  }
`;

const PhoneFrame = styled.div`
  width: 120px;
  height: 160px;
  background: ${({ theme }) => theme.colors.semanticColorsTextPrimary};
  border-radius: 12px;
  padding: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 4px;
    background: ${({ theme }) => theme.colors.semanticColorsTextSecondary};
    border-radius: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 8px;
    right: 8px;
    bottom: 12px;
    background: ${({ theme }) =>
      theme.colors.semanticColorsPagePrimaryBackgroundColor};
    border-radius: 6px;
  }
`;

const SampleContent = styled.div`
  text-align: center;
`;

const samples = [
  {
    id: 'culinary-haven',
    title: 'Culinary Haven',
    description:
      'Mobile restaurant info page with image gallery, ratings, and booking functionality',
    type: 'Mobile Restaurant Page',
    href: '/restaurant-mobile/1',
  },
  {
    id: 'spice-route',
    title: 'Spice Route',
    description:
      'Mobile restaurant page showcasing Indian cuisine with different layout and content',
    type: 'Mobile Restaurant Page',
    href: '/restaurant-mobile/2',
  },
  {
    id: 'bella-vista',
    title: 'Bella Vista',
    description: 'Mobile restaurant page featuring Italian dining experience',
    type: 'Mobile Restaurant Page',
    href: '/restaurant-mobile/3',
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    description:
      'Mobile restaurant page highlighting coastal cuisine and seafood',
    type: 'Mobile Restaurant Page',
    href: '/restaurant-mobile/4',
  },
  {
    id: 'classic-restaurant',
    title: 'Classic Restaurant View',
    description:
      'Traditional desktop restaurant page layout with comprehensive information',
    type: 'Desktop Restaurant Page',
    href: '/restaurant/1',
  },
  {
    id: 'city-explorer',
    title: 'City Explorer',
    description:
      'Browse restaurants by city with filtering and search capabilities',
    type: 'City Page',
    href: '/city/1',
  },
  {
    id: 'design-system',
    title: 'Design System',
    description: 'Complete UI component library and design tokens showcase',
    type: 'Component Library',
    href: '/ui-kit',
  },
];

const SamplesPage: NextPage = () => {
  return (
    <React.Fragment>
      <SEO
        title="Design Samples - TheFork Frontend"
        description="Explore different design samples and components for TheFork restaurant platform"
        canonical="https://www.thefork.com/samples"
      />

      <PageContainer>
        <Container>
          <HeaderSection>
            <VStack spacing="coreSpacing05">
              <Heading variant="h1">Design Samples</Heading>
              <Text variant="t1" color="secondary">
                Explore different design patterns and components for the TheFork
                platform
              </Text>
            </VStack>
          </HeaderSection>

          <SamplesGrid>
            {samples.map((sample) => (
              <SampleCard key={sample.id}>
                <SamplePreview>
                  <PhoneFrame />
                </SamplePreview>

                <SampleContent>
                  <VStack spacing="coreSpacing04">
                    <VStack spacing="coreSpacing02">
                      <Text variant="t3" color="secondary" weight="medium">
                        {sample.type}
                      </Text>
                      <Heading variant="h3">{sample.title}</Heading>
                      <Text variant="t2" color="secondary">
                        {sample.description}
                      </Text>
                    </VStack>

                    <Link href={sample.href} passHref>
                      <Button hierarchy="primary" fillContainer>
                        View Sample
                      </Button>
                    </Link>
                  </VStack>
                </SampleContent>
              </SampleCard>
            ))}
          </SamplesGrid>
        </Container>
      </PageContainer>
    </React.Fragment>
  );
};

export default SamplesPage;
