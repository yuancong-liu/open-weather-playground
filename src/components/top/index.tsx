'use client';
import { useState } from 'react';

import useSWR from 'swr';

import { axiosInstance } from '@/utils/axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

type Coord = {
  lon: number;
  lat: number;
};

export const Top = () => {
  const [coord, setCoord] = useState<Coord>({ lon: 10, lat: 10 });

  setCoord({ lon: 10, lat: 10 });

  const fetcher = (url: string, lon: number, lat: number, apiKey: string) =>
    axiosInstance
      .get(url, { params: { lon, lat, appId: apiKey } })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    [`/weather`, coord.lon, coord.lat],
    () => fetcher('/weather', coord.lon, coord.lat, API_KEY),
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <>
      <div>{data.name}</div>
      <div>{data.weather[0].main}</div>
    </>
  );
};
