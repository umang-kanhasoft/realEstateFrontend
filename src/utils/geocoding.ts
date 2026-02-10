// Utility functions for geocoding and location handling

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodedLocation {
  coordinates: Coordinates;
  formattedAddress: string;
  confidence: number;
}

/**
 * Geocode an address to get coordinates using OpenStreetMap Nominatim API
 * This is a free service with usage limits (1 request per second max)
 */
export async function geocodeAddress(
  address: string
): Promise<GeocodedLocation | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'RealEstateApp/1.0 (contact@realestate.com)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const result = data[0];

    return {
      coordinates: {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
      },
      formattedAddress: result.display_name || address,
      confidence: parseFloat(result.importance) || 0.5,
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

/**
 * Reverse geocode coordinates to get address
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'RealEstateApp/1.0 (contact@realestate.com)',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data = await response.json();
    return data.display_name || null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

/**
 * Calculate distance between two coordinates in kilometers
 */
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Generate a default coordinate for major Indian cities if geocoding fails
 */
export function getDefaultCoordinates(city?: string): Coordinates | null {
  const cityCoordinates: Record<string, Coordinates> = {
    ahmedabad: { lat: 23.0225, lng: 72.5714 },
    mumbai: { lat: 19.076, lng: 72.8777 },
    delhi: { lat: 28.6139, lng: 77.209 },
    bangalore: { lat: 12.9716, lng: 77.5946 },
    chennai: { lat: 13.0827, lng: 80.2707 },
    kolkata: { lat: 22.5726, lng: 88.3639 },
    pune: { lat: 18.5204, lng: 73.8567 },
    hyderabad: { lat: 17.385, lng: 78.4867 },
    jaipur: { lat: 26.9124, lng: 75.7873 },
    surat: { lat: 21.1702, lng: 72.8311 },
  };

  if (!city) return null;

  const normalizedCity = city.toLowerCase().trim();
  return cityCoordinates[normalizedCity] || null;
}

/**
 * Format coordinates for display
 */
export function formatCoordinates(coordinates: Coordinates): string {
  return `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`;
}

/**
 * Generate Google Maps URL for directions
 */
export function generateGoogleMapsUrl(
  coordinates: Coordinates,
  address?: string
): string {
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const params = new URLSearchParams();

  if (address) {
    params.set('destination', address);
  } else {
    params.set('destination', `${coordinates.lat},${coordinates.lng}`);
  }

  return `${baseUrl}&${params.toString()}`;
}

/**
 * Generate OpenStreetMap URL for sharing
 */
export function generateOSMUrl(
  coordinates: Coordinates,
  zoom: number = 15
): string {
  return `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=${zoom}/${coordinates.lat}/${coordinates.lng}`;
}
