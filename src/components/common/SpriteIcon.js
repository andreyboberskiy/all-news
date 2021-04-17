import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const sizeConfig = {
  lg: 32,
  md: 24,
  sm: 16,
  xs: 12,
};

const SpriteIcon = ({ name, size, ...props }) => {
  const widthHeight = useMemo(() => {
    const number = sizeConfig[size];

    if (number) {
      return {
        width: number,
        height: number,
      };
    }

    return {};
  }, [size]);

  return (
    <svg {...widthHeight} {...props}>
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

SpriteIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(Object.keys(sizeConfig)),
};

SpriteIcon.defaultProps = {
  size: 'md',
};

export default SpriteIcon;
