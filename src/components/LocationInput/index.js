import React, { useState, useEffect, useRef } from 'react';

// styled components
import { Wrapper, InputWrap, Label, Input } from './LocationInput.styles';

// components
import LocationList from 'components/LocationList';
import Spinner from 'components/Spinner';
import { isEmpty } from 'helpers/utils';

import { fetchGeolocation } from 'api';

const LocationInput = ({ setLocation }) => {
  const [input, setInput] = useState('');
  const initial = useRef(true); // prevent geolocation fetch on page load
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');

  const getLocations = (query) => {
    console.log('Fetching');
    setLoading(true);
    fetchGeolocation(query)
      .then((data) => setLocations(data.data))
      .catch((err) => {
        setError(err);
        setLocations([]);
      })
      .finally(() => setLoading(false));
  };

  const clearLocations = () => setLocations([]);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    } else {
      const timeout = setTimeout(() => {
        // only fetch geolocations if there is an input that is not empty or filled with whitespace
        if (input.trim()) getLocations(input);
        else clearLocations();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [input]);

  return (
    <Wrapper>
      <InputWrap>
        <Label htmlFor="location-input">Or enter your location</Label>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </InputWrap>
      {!isEmpty(locations) && (
        <LocationList locations={locations} setLocation={setLocation} />
      )}
    </Wrapper>
  );
};

export default LocationInput;
