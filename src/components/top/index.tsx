'use client';
import { useEffect, useState } from 'react';

import useSWR from 'swr';

import { axiosInstance } from '@/utils/axios';

type Coord = {
  lon: number | undefined;
  lat: number | undefined;
};

export const Top = () => {
  const [coord, setCoord] = useState<Coord>({ lon: undefined, lat: undefined });
  const [valid, setValid] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const getGeolocation = () =>
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);

      setCoord({
        lon: longitude,
        lat: latitude,
      });
    });

  useEffect(() => {
    if ('geolocation' in navigator) {
      console.log('geolocation is available');
      setValid(true);
      return;
    }
    setCounter(counter + 1);
  }, [counter]);

  if (valid) {
    getGeolocation();
  }

  // const fetcher = (url: string) =>
  //   axiosInstance.get(url).then((res) => res.data);

  // const { data, error, loading } = useSWR(
  //   `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=dd30f029a286f28d279777bc9e9ec333`,
  //   fetcher,
  // );

  return <div><button onClick={getGeolocation}>hi!</button>{coord.lat}</div>;
};
