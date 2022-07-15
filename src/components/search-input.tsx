import React, { FC, useState } from 'react';
import { Location } from '../types';
import debounce from 'lodash/debounce';

// components
import AsyncSelect from 'react-select/async';
// import { AsyncPaginate } from 'react-select-async-paginate';

// api
import { fetchLocations } from '../app/api';

// debounced input handler
const _loadLocations = (
  value: string,
  successCallback: (arg0: any) => void
) => {
  fetchLocations(value)
    .then((data) => successCallback(data))
    .catch((error) => console.error(error.message));
};
const loadLocations = debounce(_loadLocations, 300);

type Props = {
  onChange: (_: string | null) => void;
};

type Option = {
  value: string;
  label: string;
};

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export const colourOptions: readonly ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue: string) =>
  new Promise<ColourOption[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export const SearchInput: FC<Props> = ({ onChange }) => {
  const [input, setInput] = useState<string | null>('');
  const [error, setError] = useState<string>('');

  const handleChange = (value: string | null) => {
    setInput(value);
    onChange(value);
  };

  // const loadOptions = (
  //   value: string | null
  // ): { options: Option[] } | Promise<{ options: Option[] }> => {
  //   if (value) {
  //     return fetchLocations(value)
  //       .then((cities) => {
  //         return {
  //           options: cities
  //             .filter((city) => city.name && city.longitude && city.latitude)
  //             .map((city) => ({
  //               value: `${city.latitude} ${city.longitude}`,
  //               label: city.name as string,
  //             })),
  //         };
  //       })
  //       .catch((err) => {
  //         console.error(err.message);
  //         return { options: [] };
  //       });

  //     // const cities = await fetchLocations(value);
  //     // const result: { options: Option[] } = { options: [] };
  //     // cities.forEach((city) => {
  //     //   if (city.name && city.latitude && city.longitude) {
  //     //     result.options.push({
  //     //       value: { lat: city.latitude, lon: city.longitude },
  //     //       label: city.name,
  //     //     });
  //     //   }
  //     // });
  //   } else {
  //     return { options: [] } as { options: Option[] };
  //   }
  // };

  // const loadOptions = async (value: string | null) => {
  //   return {
  //     options: [
  //       {
  //         value: 'london',
  //         label: 'London: UK',
  //       },
  //       {
  //         value: 'paris',
  //         label: 'Paris: France',
  //       },
  //       {
  //         value: 'geneva',
  //         label: 'Geneva, Switzerland',
  //       },
  //       {
  //         value: 'barcelona',
  //         label: 'Barcelona, Spain',
  //       },
  //     ],
  //   };
  // };

  // return (
  //   <AsyncPaginate
  //     placeholder="Search for locations"
  //     debounceTimeout={500}
  //     value={input}
  //     onChange={handleChange}
  //     loadOptions={loadOptions}
  //   />
  // );

  return (
    <AsyncSelect
      placeholder="Enter location"
      cacheOptions
      loadOptions={loadOptions}
    />
  );
};
