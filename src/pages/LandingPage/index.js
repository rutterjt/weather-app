import React from 'react';

// components
import Layout from 'components/layout/Layout';
import Header from 'components/Header';
import WeatherImage from 'components/WeatherImage';
import LocationButton from 'components/LocationButton';
import LocationInput from 'components/LocationInput';

// styled components
import { IconWrap, Controls, ButtonWrap } from './LandingPage.styles';

// store
import { useStore } from 'store/useStore';
import { SET_LOCATION } from 'store/actions';

const LandingPage = () => {
  const { loading } = useStore();
  const weatherId = 100;
  const timeOfDay = 'day';
  // return (
  // <Layout
  //   weatherID={weatherId}
  //   timeOfDay={timeOfDay}
  //   loading={loading}
  //   header={<Header title="Weather App" />}
  // >
  //   <div>
  //     <IconWrap>
  //       <WeatherImage weatherID={weatherId} timeOfDay={timeOfDay} />
  //     </IconWrap>
  //     <Controls>

  /* <ButtonWrap>
            <LocationButton label="Detect location" callback={fetchWeather} />
            {error && (
              <p>
                Oops, there was a problem. Your device's privacy settings may
                prevent getting your location.
              </p>
            )}
          </ButtonWrap>
          <LocationInput locations={locations} setLocation={setLocation} /> */
  //       </Controls>
  //     </div>
  //   </Layout>
  // );
  return (
    <main>
      <h1>
        Weather App
      </h1>
    </main>
  );
};

export default LandingPage;
