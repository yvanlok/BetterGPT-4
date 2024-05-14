import React from 'react';
import useStore from '@store/store';
import Images from './Images';
import Me from './Me';
import AboutMenu from '@components/AboutMenu';
import Links from './Links';
import ImportExportChat from '@components/ImportExportChat';
import SettingsMenu from '@components/SettingsMenu';
import CollapseOptions from './CollapseOptions';
import SignOut from './SignOut';

const MenuOptions = () => {
  const hideMenuOptions = useStore((state) => state.hideMenuOptions);
  return (
    <>
      <CollapseOptions />
      <div
        className={`${
          hideMenuOptions ? 'max-h-0' : 'max-h-full'
        } overflow-hidden transition-all`}
      >
        <AboutMenu />
        <ImportExportChat />
        <SettingsMenu />
        <SignOut />
        <Me />
      </div>
    </>
  );
};

export default MenuOptions;
