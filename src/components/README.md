# Components Directory

This directory contains reusable React components for the TheFork frontend application.

## New Mobile Components

### RestaurantInfo

A comprehensive mobile restaurant information page component that displays:

- Restaurant image gallery with grid layout
- Restaurant details (name, rating, address, price, cuisine type)
- Related restaurants section
- Fixed bottom booking button

**Usage:**

```tsx
import RestaurantInfo from '@/components/RestaurantInfo/RestaurantInfo';

<RestaurantInfo
  restaurant={restaurantData}
  relatedRestaurants={relatedRestaurantsData}
  cityName="Paris"
/>;
```

### RestaurantGallery

A responsive image gallery component that displays restaurant photos in a grid layout:

- Main image takes 2x2 grid space
- Smaller thumbnail images fill remaining grid spaces
- Optimized for mobile viewing

**Usage:**

```tsx
import RestaurantGallery from '@/components/RestaurantGallery/RestaurantGallery';

<RestaurantGallery images={imageUrls} alt="Restaurant name" />;
```

### MobileButtonDock

A fixed bottom button container specifically designed for mobile interfaces:

- Fixed positioning at bottom of screen
- Proper spacing and background
- Designed for primary action buttons

**Usage:**

```tsx
import MobileButtonDock from '@/components/MobileButtonDock/MobileButtonDock';

<MobileButtonDock>
  <Button hierarchy="primary" fillContainer>
    Book now
  </Button>
</MobileButtonDock>;
```

## Pages

### Mobile Restaurant Page

- **Route:** `/restaurant-mobile/[restaurantID]`
- **Description:** Mobile-optimized restaurant detail page
- **Features:**
  - Mobile-first responsive design
  - Image gallery
  - Restaurant information display
  - Related restaurants
  - Booking functionality
  - Fallback to mock data for demo purposes

### Samples Collection Page

- **Route:** `/samples`
- **Description:** Showcase page for different design samples
- **Features:**
  - Grid layout of sample cards
  - Navigation to different restaurant examples
  - Design system component showcase
  - Back navigation to home

## Mock Data

- **File:** `src/data/mockRestaurants.ts`
- **Purpose:** Provides sample restaurant data for demonstration
- **Usage:** Fallback data when GraphQL queries fail or for testing

## Design System Integration

All components follow the existing design system patterns:

- Use existing theme tokens for colors, spacing, typography
- Consistent with existing component architecture
- Emotion styled-components for styling
- TypeScript for type safety
