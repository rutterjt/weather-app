import React from 'react';
import PropTypes from 'prop-types';

import s from './Wrapper.module.css';

/*

Color reference:
- lightBlue
- medBlue
- darkBlue
- cyan
- darkCyan
- yellow
- purple
- green

*/

const Wrapper = ({ color = 'lightBlue', children }) => {
  return (
    <div className={s[color]}>
      <div className={s.content}>{children}</div>
    </div>
  );
};

Wrapper.propTypes = {
  color: PropTypes.string,
};

Wrapper.defaultProps = {
  color: 'lightBlue',
};

export default Wrapper;
