import React from 'react';

// styled components
import { List, Item, Button } from './LocationList.styles';

import { isEmpty } from 'helpers/utils';

const LocationList = ({ locations, setLocation }) => {
  const set = ({ latitude, longitude }) => setLocation({ latitude, longitude });

  if (!isEmpty(locations)) {
    return (
      <List>
        {locations.map((location, index) => {
          const { label } = location;
          return (
            <Item key={index}>
              <Button onClick={() => set(location)}>{label}</Button>
            </Item>
          );
        })}
      </List>
    );
  } else {
    return null;
  }
};

export default LocationList;
