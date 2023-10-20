import React from 'react';
import useStore from '@store/store';

import Me from './Me';
import AboutMenu from '@components/AboutMenu';
import Links from '@components/Links';
import ImportExportChat from '@components/ImportExportChat';
import SettingsMenu from '@components/SettingsMenu';
import CollapseOptions from './CollapseOptions';
import GoogleSync from '@components/GoogleSync';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;

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
        {googleClientId && <GoogleSync clientId={googleClientId} />}
        <Links />
        <AboutMenu />
        <ImportExportChat />
        <SettingsMenu />
        <Me />
      </div>
    </>
  );
};

export default MenuOptions;
