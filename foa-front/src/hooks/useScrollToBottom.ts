//file to manage scroll

import { useEffect, useState } from 'react';

function useScrollToBottom(
  containerRef: React.RefObject<HTMLElement | null>,
  cb: () => void,
  offset = 0,
) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      // Check if the user has scrolled to the bottom (with optional offset)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - offset;
      setIsBottom(isAtBottom);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    // Cleanup event listener on unmount
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef, offset]);

  useEffect(() => {
    console.log('IS BOTTOM', isBottom);
    if (isBottom) {
      cb();
    }
  }, [isBottom, cb]);
}

export default useScrollToBottom;