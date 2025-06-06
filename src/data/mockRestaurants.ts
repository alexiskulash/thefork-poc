import { Restaurant } from '@/types/api';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'culinary-haven',
    name: 'Culinary Haven',
    photo:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9f2d2619487f80c31704661e7a8116d71b6f87fc?placeholderIfAbsent=true',
    bestOffer: '20% off',
    address: {
      street: '123 Gourmet Street',
      zipCode: '75001',
      locality: 'Paris',
      country: 'France',
    },
    averagePrice: {
      value: 45,
      currency: 'EUR',
    },
    aggregateRatings: {
      ratingValue: 8.5,
      reviewCount: 234,
    },
  },
  {
    id: '2',
    slug: 'spice-route',
    name: 'Spice Route',
    photo:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/a12ef5e22bf0981e22697520a48d5ff67cd44df9?placeholderIfAbsent=true',
    bestOffer: '15% off',
    address: {
      street: '456 Curry Lane',
      zipCode: '110001',
      locality: 'Delhi',
      country: 'India',
    },
    averagePrice: {
      value: 25,
      currency: 'EUR',
    },
    aggregateRatings: {
      ratingValue: 9.2,
      reviewCount: 456,
    },
  },
  {
    id: '3',
    slug: 'bella-vista',
    name: 'Bella Vista',
    photo:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/a12ef5e22bf0981e22697520a48d5ff67cd44df9?placeholderIfAbsent=true',
    bestOffer: '10% off',
    address: {
      street: '789 Tuscan Way',
      zipCode: '53100',
      locality: 'Siena',
      country: 'Italy',
    },
    averagePrice: {
      value: 35,
      currency: 'EUR',
    },
    aggregateRatings: {
      ratingValue: 8.8,
      reviewCount: 189,
    },
  },
  {
    id: '4',
    slug: 'ocean-breeze',
    name: 'Ocean Breeze',
    photo:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/a12ef5e22bf0981e22697520a48d5ff67cd44df9?placeholderIfAbsent=true',
    bestOffer: '25% off',
    address: {
      street: '321 Coastal Road',
      zipCode: '80132',
      locality: 'Naples',
      country: 'Italy',
    },
    averagePrice: {
      value: 40,
      currency: 'EUR',
    },
    aggregateRatings: {
      ratingValue: 8.1,
      reviewCount: 167,
    },
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return mockRestaurants.find((restaurant) => restaurant.id === id);
};

export const getRestaurantsByCity = (city: string): Restaurant[] => {
  return mockRestaurants.filter(
    (restaurant) =>
      restaurant.address.locality.toLowerCase() === city.toLowerCase()
  );
};
