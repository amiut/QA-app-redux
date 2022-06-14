import React from 'react';

export type IconProps = {
  name: string;
  className?: string;
};

const Icon = ({ name, className }: IconProps) => {
  return (
    <svg className={`icon ${name} ${className}`}>
      <use xlinkHref={`/static/svg/sprites.svg#${name}`} />
    </svg>
  );
};

export default Icon;
