import { useState, useCallback } from 'react';

export const useViewToggle = (initialState = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggle = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    toggle,
    show,
    hide,
  };
}; 