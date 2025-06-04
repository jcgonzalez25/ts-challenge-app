import { useState, useCallback } from 'react';
import { ViewToggleOperations } from './types';

export function useViewToggle(initialState = false): ViewToggleOperations {
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
} 