'use client';
import { useState } from 'react';

import Image from 'next/image';
import useSWR from 'swr';

import { axiosInstance } from '@/utils/axios';

import { Suggest } from '../suggest';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

type Coord = {
  lon: number;
  lat: number;
};

export const Top = () => {
  const [coord, setCoord] = useState<Coord | undefined>(undefined);

  const fetcher = (
    url: string,
    lat: number | undefined,
    lon: number | undefined,
    apiKey: string,
  ) =>
    axiosInstance
      .get(url, { params: { lat, lon, appId: apiKey } })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    coord ? [`/data/2.5/weather`, coord.lon, coord.lat] : null,
    () => fetcher('/data/2.5/weather', coord?.lat, coord?.lon, API_KEY),
  );

  const content = () => {
    if (!coord) return <div>Try a city</div>;

    if (isLoading) return <div className="text-center">Loading...</div>;

    if (error ?? !data) return <div className="text-center">Error!</div>;
    
    return (
      <>
        <h1 className="text-5xl font-bold">{data.weather[0].main}</h1>
        <div>{data.name}</div>
        <Image
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].main}
          width={100}
          height={100}
          priority
        />
      </>
    );
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-5">
      <Suggest setCoord={setCoord} />
      {content()}
    </div>
  );
};
