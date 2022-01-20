import React, { useState } from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Wrapper = styled.section`
  width: 100%;
  min-width: 250px;
  max-width: 450px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.95);
  color: #000;
  border-radius: 0.25rem;
  padding: 1rem 2rem;
  ${(props) => props.theme.shadow}
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Trigger = styled.button`
  display: block;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/**
 * Renders a dropdown box.
 *
 * @param {string} title - The heading for the dropdown.
 * @param {boolean} openOnMount - (Optional) whether the dropdown is initially open.
 * @param {any} children - The dropdown content.
 */
const Dropdown = ({ title, openOnMount, children }) => {
  const [open, setOpen] = useState(openOnMount);

  const toggle = () => setOpen((open) => !open);
  return (
    <Wrapper>
      <Trigger onClick={toggle}>
        <Title>{title}</Title>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </Trigger>
      {open && <div>{children}</div>}
    </Wrapper>
  );
};

Dropdown.defaultProps = {
  openOnMount: false,
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  openOnMount: PropTypes.bool,
  children: PropTypes.node,
};

export default Dropdown;
