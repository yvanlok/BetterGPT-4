import React from 'react';
import {
  useAtBottom,
  useScrollToBottom,
  ScrollOption,
} from 'react-scroll-to-bottom'; // Import ScrollOption

import DownArrow from '@icon/DownArrow';

const ScrollToBottomButton = React.memo(() => {
  const scrollToBottom = () => {
    useScrollToBottom(); // Call useScrollToBottom with the appropriate ScrollOption if needed
  };

  const [atBottom] = useAtBottom();

  return (
    <button
      className={`cursor-pointer absolute right-6 bottom-[60px] md:bottom-[60px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200 ${
        atBottom ? 'hidden' : ''
      }`}
      onClick={scrollToBottom}
    >
      <DownArrow />
    </button>
  );
});

export default ScrollToBottomButton;
