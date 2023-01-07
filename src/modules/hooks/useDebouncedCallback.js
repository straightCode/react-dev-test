import {useCallback, useRef} from "react";

const useDebouncedCallback = (
  callback,
  delay
) => {
  const timeout = useRef();

  return useCallback((...args) => {
    if (timeout.current != null) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

export default useDebouncedCallback;
