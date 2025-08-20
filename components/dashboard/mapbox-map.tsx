import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to set this in your environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapboxMapProps {
  location?: string;
  className?: string;
  circleRadius?: number; // Radius in meters for the location circle
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  location,
  className = '',
  circleRadius = 500, // Default 500 meter radius
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>([-74.006, 40.7128]); // Default to NYC
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to geocode location
    const geocodeLocation = async () => {
      if (!location) {
        setIsLoading(false);
        return;
      }

      try {
        // Use location geocoding
        if (location && mapboxgl.accessToken) {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const encodedLocation = encodeURIComponent(location);
          let response;
          try {
            response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation}.json?access_token=${mapboxgl.accessToken}`,
              {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                },
                signal: controller.signal,
              }
            );
          } catch (error) {
            console.error('Error in geocoding process:', error);
            return;
          }

          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              const [lng, lat] = data.features[0].center;
              setCoordinates([lng, lat]);
            } else {
              setCoordinates([-74.006, 40.7128]); // Default to NYC
            }
          } else {
            setCoordinates([-74.006, 40.7128]); // Default to NYC
          }
        } else {
          setCoordinates([-74.006, 40.7128]); // Default to NYC
        }
      } catch {
        setCoordinates([-74.006, 40.7128]); // Default to NYC
      } finally {
        setIsLoading(false);
      }
    };

    geocodeLocation();
  }, [location]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 15,
      pitch: 60, // More dramatic 3D tilt
      bearing: 0,
      trackResize: true,
      attributionControl: false, // Disable attribution to reduce clutter
    });

    // Disable telemetry/analytics
    map.current.on('load', () => {
      if (map.current) {
        // Enable 3D buildings
        map.current.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.8,
          },
        });

        // Add location circle source and layers
        map.current.addSource('location-circle', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coordinates,
            },
            properties: {},
          },
        });

        // Add the filled circle layer
        map.current.addLayer({
          id: 'location-circle-fill',
          type: 'circle',
          source: 'location-circle',
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              8,
              circleRadius / 50, // At zoom 8, radius = circleRadius/50 pixels
              12,
              circleRadius / 25, // At zoom 12, radius = circleRadius/25 pixels
              16,
              circleRadius / 15, // At zoom 16, radius = circleRadius/15 pixels
              20,
              circleRadius / 8, // At zoom 20, radius = circleRadius/8 pixels
            ],
            'circle-color': '#f97316', // Orange color to match theme
            'circle-opacity': 0.3,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#f97316',
            'circle-stroke-opacity': 0.8,
          },
        });

        // Add a perimeter outline layer for better visibility
        map.current.addLayer({
          id: 'location-circle-outline',
          type: 'circle',
          source: 'location-circle',
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              8,
              circleRadius / 50,
              12,
              circleRadius / 25,
              16,
              circleRadius / 15,
              20,
              circleRadius / 8,
            ],
            'circle-color': 'transparent',
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ea580c', // Darker orange for perimeter
            'circle-stroke-opacity': 1,
          },
        });
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [coordinates, circleRadius]);

  useEffect(() => {
    if (map.current && !isLoading) {
      map.current.setCenter(coordinates);
      map.current.flyTo({
        center: coordinates,
        zoom: 15,
        pitch: 60,
        bearing: 0,
      });

      // Update the circle source with new coordinates
      const source = map.current.getSource('location-circle');
      if (source && source.type === 'geojson') {
        (source as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          properties: {},
        });
      }
    }
  }, [coordinates, isLoading]);

  if (!mapboxgl.accessToken) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-gray-500 text-sm">Mapbox access token not configured</p>
          <p className="text-gray-400 text-xs">
            Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your environment variables
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-500 text-sm mt-2">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default MapboxMap;
