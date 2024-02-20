'use client';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { axiosInstance } from '@/utils/axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

type Coord = {
  lon: number;
  lat: number;
};

export const Top = () => {
  const [coord, setCoord] = useState<Coord>({ lon: 10, lat: 10 });
  // const [valid, setValid] = useState<boolean>(false);
  // const [counter, setCounter] = useState<number>(0);

  // const getGeolocation = () =>
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { latitude, longitude } = position.coords;
  //     console.log(latitude, longitude);

  //     setCoord({
  //       lon: longitude,
  //       lat: latitude,
  //     });
  //   });

  // useEffect(() => {
  //   if ('geolocation' in navigator) {
  //     console.log('geolocation is available');
  //     setValid(true);
  //     return;
  //   }
  //   setCounter(counter + 1);
  // }, [counter]);

  // if (valid) {
  //   getGeolocation();
  // }

  const fetcher = (url: string, lon: number, lat: number, apiKey: string) =>
    axiosInstance
      .get(url, { params: { lon, lat, appId: apiKey } })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    [`/weather`, coord.lon, coord.lat],
    () => fetcher('/weather', coord.lon, coord.lat, API_KEY),
  );

  console.log(data, error, isLoading);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error!</div>;

  return (
    <>
      <div>{data.name}</div>
      <div>{data.weather[0].main}</div>
    </>
  );
};
