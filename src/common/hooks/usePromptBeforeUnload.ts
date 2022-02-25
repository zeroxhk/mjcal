import { useEffect } from 'react';

export const usePromptBeforeUnload = (message: string, { active = true }: { active?: boolean } = {}) =>
  useEffect(() => {
    if (!active) return;
    const cb = (e: Event) => {
      e.preventDefault();
      e.returnValue = message as any;

      return message;
    };

    window.addEventListener('beforeunload', cb);
    return () => window.removeEventListener('beforeunload', cb);
  }, [message, active]);
