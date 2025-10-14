import * as Location from 'expo-location';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Zone = {
  zoneName: string;
  contractAddress: string;
  latitude: number;
  longitude: number;
  radius: number;
};
type GeoStatus = "Inside" | "Outside" | "Checking..." | "Permission Denied";

const API_CHECK_ZONE = "https://dbsxbxyn12.execute-api.ap-south-1.amazonaws.com/findZone";

function haversine(p1: { lat: number; lon: number }, p2: { lat: number; lon: number }) {
  const R = 6371e3;
  const φ1 = (p1.lat * Math.PI) / 180;
  const φ2 = (p2.lat * Math.PI) / 180;
  const Δφ = ((p2.lat - p1.lat) * Math.PI) / 180;
  const Δλ = ((p2.lon - p1.lon) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type ZoneContextType = {
  location: Location.LocationObject | null;
  zone: Zone | null;
  status: GeoStatus;
  permission: Location.PermissionStatus | 'unknown';
  connected: boolean;
};

const ZoneContext = createContext<ZoneContextType | undefined>(undefined);

export const ZoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [permission, setPermission] = useState<Location.PermissionStatus | 'unknown'>('unknown');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [zone, setZone] = useState<Zone | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission(status);
      if (status !== "granted") return;
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 10 },
        (loc) => setLocation(loc)
      );
    })();
    return () => sub?.remove();
  }, []);

  const fetchZone = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(API_CHECK_ZONE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
      const data = await res.json();

      if (data && data.contractAddress) {
        setZone({
          zoneName: data.zoneName ?? data.name ?? 'Zone',
          contractAddress: data.contractAddress,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          radius: Number(data.radius),
        });
        setConnected(true);
      } else {
        setZone(null);
        setConnected(false);
      }
    } catch (e) {
      console.warn('Zone fetch failed:', e);
      setConnected(false);
      setZone(null);
    }
  }, []);

  useEffect(() => {
    if (location?.coords) {
      fetchZone(location.coords.latitude, location.coords.longitude);
    }
  }, [location, fetchZone]);

  const status: GeoStatus = React.useMemo(() => {
    if (permission !== 'granted') return 'Permission Denied';
    if (!location || !zone) return 'Outside';
    const d = haversine(
      { lat: location.coords.latitude, lon: location.coords.longitude },
      { lat: zone.latitude, lon: zone.longitude }
    );
    return d < (zone.radius ?? 0) ? 'Inside' : 'Outside';
  }, [permission, location, zone]);

  const value = { location, zone, status, permission, connected };

  return <ZoneContext.Provider value={value}>{children}</ZoneContext.Provider>;
};

export const useZoneContext = () => {
  const context = useContext(ZoneContext);
  if (context === undefined) {
    throw new Error('useZoneContext must be used within a ZoneProvider');
  }
  return context;
};