import React from 'react';

// styled components
import {
  Wrapper,
  Content,
  Row,
  OpenButton,
  SettingsButton,
  Headings,
  Title,
  SubTitle,
} from './Header.styles';

// components
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import { IoSettingsSharp } from 'react-icons/io5';

// helpers
import { capitalize } from 'helpers/format';

const Header = ({ title, subtitle }) => {
  return (
    <Wrapper>
      <Content>
        <Row>
          {/* <OpenButton
            aria-label="Get weather for current location"
          >
            <FaMapMarkerAlt />
          </OpenButton> */}
          <Headings>
            <Title>{capitalize(title)}</Title>
            {subtitle && <SubTitle>{capitalize(subtitle)}</SubTitle>}
          </Headings>
          {/* <SettingsButton>
            <IoSettingsSharp />
          </SettingsButton> */}
        </Row>
      </Content>
    </Wrapper>
  );
};

export default Header;
