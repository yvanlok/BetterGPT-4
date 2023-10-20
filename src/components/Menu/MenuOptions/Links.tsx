import React, { useState } from 'react';
import MoneyIcon from '@icon/MoneyIcon';
const Links = () => {
  return (
    <>
      <a
        className='flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
        href='https://links.ylokh.xyz'
      >
        <div>
          <MoneyIcon />
        </div>
        Passive Income
      </a>
    </>
  );
};

export default Links;
