'use client';

import { useEffect, useState } from 'react';

const useDebounceValue = (value: string) => {
  const [debounceValue, setDebounceValue] = useState<string>('');

  useEffect(() => {
    const id = setTimeout(() => setDebounceValue(value), 400);
    return () => {
      clearTimeout(id);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounceValue;
