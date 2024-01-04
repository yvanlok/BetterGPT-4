import React from 'react';
import { auth } from '@utils/firebase-auth';
import LogoutIcon from '@icon/LogoutIcon';
const SignOut = () => {
  return (
    <a
      className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
      onClick={() => auth.signOut()}
      style={{ alignItems: 'flex-start' }}
    >
      <div>
        <LogoutIcon />
      </div>
      Sign Out
    </a>
  );
};

export default SignOut;