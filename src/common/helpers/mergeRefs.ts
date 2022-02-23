import { MutableRefObject, useCallback } from 'react';

export const mergeRefs = <T>(...refs: (MutableRefObject<T> | ((t: T) => void))[]): ((t: T) => void) => {
  return useCallback(v => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(v);
      } else {
        ref.current = v;
      }
    }
  }, refs);
};
