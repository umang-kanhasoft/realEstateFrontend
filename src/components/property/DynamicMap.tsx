'use client';

import {
  generateGoogleMapsUrl,
  generateOSMUrl,
  geocodeAddress,
  getDefaultCoordinates,
  type Coordinates,
} from '@/utils/geocoding';
import DirectionsIcon from '@mui/icons-material/Directions';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface DynamicMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  locality?: string;
  city?: string;
  className?: string;
}

interface LeafletMapOptions {
  center: [number, number];
  zoom: number;
  zoomControl?: boolean;
  attributionControl?: boolean;
}

interface LeafletTileLayerOptions {
  attribution: string;
  maxZoom: number;
}

interface LeafletMarkerOptions {
  icon?: LeafletIcon;
}

interface LeafletIconOptions {
  html: string;
  className: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
}

interface LeafletCircleOptions {
  color: string;
  fillColor: string;
  fillOpacity: number;
  radius: number;
}

interface LeafletIcon {
  bindPopup(content: string): LeafletIcon;
  openPopup(): LeafletIcon;
  addTo(map: LeafletMap): LeafletIcon;
}

interface LeafletTileLayer {
  addTo(map: LeafletMap): void;
}

interface LeafletCircle {
  addTo(map: LeafletMap): void;
}

declare global {
  interface Window {
    L: {
      map: (element: HTMLElement, options: LeafletMapOptions) => LeafletMap;
      tileLayer: (
        url: string,
        options: LeafletTileLayerOptions
      ) => LeafletTileLayer;
      marker: (
        latlng: [number, number],
        options?: LeafletMarkerOptions
      ) => LeafletIcon;
      divIcon: (options: LeafletIconOptions) => LeafletIcon;
      circle: (
        latlng: [number, number],
        options: LeafletCircleOptions
      ) => LeafletCircle;
    };
  }
}

interface LeafletMap {
  remove(): void;
  [key: string]: unknown;
}

export default function DynamicMap({
  latitude,
  longitude,
  address,
  locality,
  city,
  className,
}: DynamicMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [mapControls, setMapControls] = useState({
    directionsUrl: '',
    shareUrl: '',
  });
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  // Load Leaflet CSS and JS from CDN
  const loadLeaflet = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.L) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);

      // Load JS
      const jsScript = document.createElement('script');
      jsScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      jsScript.integrity =
        'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      jsScript.crossOrigin = '';

      jsScript.onload = () => {
        resolve();
      };

      jsScript.onerror = () => {
        reject(new Error('Failed to load Leaflet'));
      };

      document.head.appendChild(jsScript);
    });
  };

  // Initialize map
  const initializeMap = async () => {
    if (!mapRef.current || !coordinates || !window.L) {
      return;
    }

    try {
      // Clear existing map if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Create map instance
      const map = window.L.map(mapRef.current, {
        center: [coordinates.lat, coordinates.lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: true,
      });

      // Add tile layer with better styling
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | © RealEstate',
        maxZoom: 19,
      }).addTo(map);

      // Create custom property marker icon
      const propertyIcon = window.L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, #1976d2, #2196f3);
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            position: relative;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(45deg);
              color: white;
              font-size: 16px;
              font-weight: bold;
            ">🏠</div>
          </div>
        `,
        className: 'property-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Add marker with popup
      const marker = window.L.marker([coordinates.lat, coordinates.lng], {
        icon: propertyIcon,
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: Arial, sans-serif;">
          <h4 style="margin: 0 0 8px 0; color: #1976d2;">Project Location</h4>
          <p style="margin: 4px 0; color: #666;">${address || locality || 'Location'}</p>
          ${locality ? `<p style="margin: 4px 0; color: #888; font-size: 12px;">📍 ${locality}</p>` : ''}
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
            <small style="color: #999;">Coordinates: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}</small>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent).openPopup();

      // Add circle to show approximate area
      window.L.circle([coordinates.lat, coordinates.lng], {
        color: '#1976d2',
        fillColor: '#2196f3',
        fillOpacity: 0.1,
        radius: 500, // 500 meter radius
      }).addTo(map);

      mapInstanceRef.current = map;

      // Generate control URLs
      setMapControls({
        directionsUrl: generateGoogleMapsUrl(coordinates, address),
        shareUrl: generateOSMUrl(coordinates),
      });

      setLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setError('Failed to initialize map');
      setLoading(false);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        setLoading(true);
        setError(null);

        let coords: Coordinates | null = null;

        // Use provided coordinates if available
        if (latitude && longitude) {
          coords = { lat: latitude, lng: longitude };
        } else if (address || locality) {
          // Otherwise geocode the address
          const fullAddress =
            `${address || ''}, ${locality || ''}, ${city || ''}`.trim();
          const geocoded = await geocodeAddress(fullAddress);

          if (geocoded) {
            coords = geocoded.coordinates;
          } else {
            // Fallback to default city coordinates
            coords = getDefaultCoordinates(city || locality);
          }
        }

        if (!coords) {
          setError('No location coordinates available');
          setLoading(false);
          return;
        }

        setCoordinates(coords);

        // Load Leaflet
        await loadLeaflet();

        // Initialize map
        await initializeMap();
      } catch (error) {
        console.error('Map setup error:', error);
        setError('Failed to load map');
        setLoading(false);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, address, locality, city]);

  useEffect(() => {
    if (coordinates && window.L) {
      initializeMap();
    }
  }, [coordinates]);

  const handleGetDirections = () => {
    if (mapControls.directionsUrl) {
      window.open(mapControls.directionsUrl, '_blank');
    }
  };

  const handleShareLocation = () => {
    if (mapControls.shareUrl) {
      window.open(mapControls.shareUrl, '_blank');
    }
  };

  return (
    <Box
      className={className}
      sx={{ width: '100%', height: '400px', position: 'relative' }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          <Box textAlign="center">
            <CircularProgress size={40} sx={{ mb: 2, color: '#1976d2' }} />
            <Typography variant="body2" color="text.secondary">
              Loading project location...
            </Typography>
          </Box>
        </Box>
      )}

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            zIndex: 1000,
            borderRadius: '8px',
          }}
        >
          <Box textAlign="center">
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Please check your internet connection and try again
            </Typography>
          </Box>
        </Box>
      )}

      <Box
        ref={mapRef}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
        }}
      />

      {/* Map Controls */}
      {!loading && !error && coordinates && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            zIndex: 1000,
          }}
        >
          <Tooltip title="Get Directions">
            <IconButton
              size="small"
              onClick={handleGetDirections}
              sx={{
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <DirectionsIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share Location">
            <IconButton
              size="small"
              onClick={handleShareLocation}
              sx={{
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
