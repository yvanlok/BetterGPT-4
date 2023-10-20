import React, { useState } from 'react';
import ImageIcon from '@icon/ImageIcon';
const Images = () => {
  return (
    <>
      <a
        className='flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
        href='https://images.ylokh.xyz'
      >
        <div>
          <ImageIcon />
        </div>
        AI Image Generator
      </a>
    </>
  );
};

export default Images;
