import React from 'react';

import HeartIcon from '@icon/HeartIcon';

const Me = () => {
  return (
    <a
      className='flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
      href='https://ylokhmotov.dev'
    >
      <HeartIcon />
      Made by Chromed
    </a>
  );
};

export default Me;
