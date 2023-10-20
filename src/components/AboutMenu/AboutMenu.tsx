import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import AboutIcon from '@icon/AboutIcon';

const AboutMenu = () => {
  return (
    <>
      <a
        className='flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
        href='https://en.liberapay.com/Yvan/'
      >
        <div>
          <AboutIcon />
        </div>
        Sponsor / Donate
      </a>
    </>
  );
};

export default AboutMenu;
