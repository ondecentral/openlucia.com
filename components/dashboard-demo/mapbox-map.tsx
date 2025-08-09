import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// You'll need to set this in your environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapboxMapProps {
  location?: string;
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ location, className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
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
                    'Accept': 'application/json',
                  },
                  signal: controller.signal,
                }
              );
          } catch (error) {

            console.error('Error in geocoding process:', error);
            return
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

      } catch (error) {
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
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.8
          }
        });
      }
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create marker
    marker.current = new mapboxgl.Marker({ color: '#f97316' }) // Orange color to match theme
      .setLngLat(coordinates)
      .addTo(map.current);

    // Cleanup function
    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && marker.current && !isLoading) {
      map.current.setCenter(coordinates);
      map.current.flyTo({ 
        center: coordinates, 
        zoom: 15,
        pitch: 60,
        bearing: 0
      });
      marker.current.setLngLat(coordinates);
    }
  }, [coordinates, isLoading]);

  if (!mapboxgl.accessToken) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-gray-500 text-sm">Mapbox access token not configured</p>
          <p className="text-gray-400 text-xs">Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your environment variables</p>
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
