import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { useSelector, useDispatch } from 'react-redux';

import { locationAdded, selectLocations } from './locationSlice';

import Spinner from '../../components/Spinner';

const List = styled.ul`
  margin-top: 0.5rem;
  z-index: 10;
  text-align: left;
  background-color: #fff;
  color: #000;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 4px 4px rgba(0, 0, 0, 0.08),
    0px 10px 10px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
`;

const Item = styled.li`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
`;

const Button = styled.button`
  display: block;
  padding: 1rem;
  text-align: left;
  width: 100%;
  font-weight: normal;

  &:hover {
    background-color: hsl(190, 100%, 97%);
  }
`;

const SpinnerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

/**
 * Renders a dropdown list of locations for the user to choose from.
 *
 * Clicking on a list item sets it as the current location.
 */
const LocationList = ({ open }) => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const status = useSelector((state) => state.location.locations.status);

  if (status === 'loading') {
    return (
      <SpinnerWrap>
        <Spinner />
      </SpinnerWrap>
    );
  }

  const addLocation = (coords, name, fullName) => {
    dispatch(locationAdded({ coords, name, fullName }));
  };

  let locationListContent;
  if (locations.length) {
    locationListContent = locations.map((location, index) => {
      const { coords, fullName, name } = location;
      return (
        <Item key={index}>
          <Button onClick={() => addLocation(coords, name, fullName)}>
            {fullName}
          </Button>
        </Item>
      );
    });
  }

  if (!isEmpty(locations) && open) {
    return <List>{locationListContent}</List>;
  } else {
    return null;
  }
};

LocationList.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LocationList;
