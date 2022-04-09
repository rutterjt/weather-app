import React from 'react';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

/**
 * Renders a spinner component to display during loading times.
 */
export const Spinner: React.FC<Props> = ({ size = 'lg' }) => {
  const diameter =
    size === 'sm'
      ? 'w-[2rem] h-[2rem]'
      : size === 'md'
      ? 'w-[3rem] h-[3rem]'
      : 'w-[5rem] h-[5rem]';
  return (
    <div
      className={`rounded-full border-4 border-transparent border-t-white animate-spin ${diameter}`}
    />
  );
};
