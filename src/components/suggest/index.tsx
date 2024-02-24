'use client';
import { ChangeEvent, useCallback, useState } from 'react';

import useSWR from 'swr';
import { useDebounceValue } from 'usehooks-ts';

import { axiosInstance } from '@/utils/axios';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

type Props = {
  setCoord: (coord: { lon: number; lat: number }) => void;
};

export const Suggest = ({ setCoord }: Props) => {
  const [value, setValue] = useState<string>('');
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [debouncedValue] = useDebounceValue(value, 1000);

  const fetcher = useCallback(
    (url: string, city: string, apiKey: string) =>
      axiosInstance
        .get(url, { params: { q: city, appId: apiKey } })
        .then((res) => res.data),
    [],
  );

  const { data, error, isLoading } = useSWR(
    debouncedValue ? [`/geo/1.0/direct`, debouncedValue] : null,
    () => fetcher('/geo/1.0/direct', debouncedValue, API_KEY),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!showPanel) {
      setShowPanel(true);
    }
    setValue(e.target.value);
  };

  const handleSelect = (lat: number, lon: number) => {
    setCoord({ lat, lon });
    setValue('');
    setShowPanel(false);
  };

  const panelContent = () => {
    if (isLoading) {
      return <div className="p-2 text-center">Loading...</div>;
    }

    if (error) {
      return <div className="p-2 text-center">Error!</div>;
    }

    if (!data || data.length === 0) {
      return <div className="p-2 text-center">No results</div>;
    }

    return (
      <ol>
        {data.map((item: any, index: number) => (
          <li key={index}>
            <button
              className="flex w-full justify-between p-2 hover:bg-slate-100"
              onClick={() => handleSelect(item.lat, item.lon)}
            >
              <span>{item.name}</span>
              <span className="text-slate-400">{item.country}</span>
            </button>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="relative flex w-full max-w-64">
      <input
        type="text"
        className="w-full border-b border-slate-300 p-2"
        value={value}
        onChange={handleChange}
        placeholder="Search"
      />
      <div
        className={`absolute top-full mt-1 w-full border border-slate-300 bg-white ${!showPanel && 'hidden'}`}
      >
        {panelContent()}
      </div>
    </div>
  );
};
