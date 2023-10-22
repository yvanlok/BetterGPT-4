import React, { useEffect, useState } from 'react';
import useStore from '@store/store';
import i18n from './i18n';

import Chat from '@components/Chat';
import Menu from '@components/Menu';

import useInitialiseNewChat from '@hooks/useInitialiseNewChat';
import { ChatInterface } from '@type/chat';
import { Theme } from '@type/theme';
import Toast from '@components/Toast';

import firebase from '@utils/firebase-auth';
import { User } from 'firebase/auth';
import Login from '@components/LoginMenu/LoginMenu';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser as User | null);
    });
  }, []);

  const initialiseNewChat = useInitialiseNewChat();
  const setChats = useStore((state) => state.setChats);
  const setTheme = useStore((state) => state.setTheme);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  }, []);

  useEffect(() => {
    // legacy local storage
    const oldChats = localStorage.getItem('chats');

    const theme = localStorage.getItem('theme');

    if (theme) {
      // legacy local storage
      setTheme(theme as Theme);
      localStorage.removeItem('theme');
    }

    if (oldChats) {
      // legacy local storage
      try {
        const chats: ChatInterface[] = JSON.parse(oldChats);
        if (chats.length > 0) {
          setChats(chats);
          setCurrentChatIndex(0);
        } else {
          initialiseNewChat();
        }
      } catch (e: unknown) {
        console.log(e);
        initialiseNewChat();
      }
      localStorage.removeItem('chats');
    } else {
      // existing local storage
      const chats = useStore.getState().chats;
      const currentChatIndex = useStore.getState().currentChatIndex;
      if (!chats || chats.length === 0) {
        initialiseNewChat();
      }
      if (
        chats &&
        !(currentChatIndex >= 0 && currentChatIndex < chats.length)
      ) {
        setCurrentChatIndex(0);
      }
    }
  }, []);

  return (
    <>
      {user ? (
        <div className='overflow-hidden w-full h-full relative flex justify-center items-center'>
          <Menu />
          <Chat />
          <Toast />
        </div>
      ) : (
        <div
          className='overflow-hidden w-full h-full relative flex justify-center items-center'
          style={{ backgroundColor: '#343541' }}
        >
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
