import { useEffect } from "react";

const eventName = "Loading";

// Event for trigger loading
export const useLocalStorage = ({ action }) => {
  const dispatchLocalStorage = (isloading) => {
    const event = new CustomEvent(eventName, { detail: isloading });
    dispatchEvent(event);
  };

  useEffect(() => {
    window.addEventListener(eventName, action);

    return () => {
      window.removeEventListener(eventName, action);
    };
  }, []);

  return { dispatchLocalStorage };
};

// Place to trigger loading state
const dispatchLoading = {
  loadingAction: (event) => {},
};

export default dispatchLoading;
