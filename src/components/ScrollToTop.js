import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RefContext } from '../contexts/RefContextProvider';

const ScrollToTop = () => {
  const location = useLocation();
  const { setIsDark } = useContext(RefContext);
  useEffect(() => {
    if (location.pathname !== "/messages") {
      document.body.style.height = "100svh"
      document.body.style.overflow = "auto"
    }
    document.body.scrollTop = 0;
  }, [location.pathname]);
  useEffect(() => {
    window.onbeforeunload = function () {
      document.body.scrollTop = 0;
    }
  }, [])
  return (null);
}

export default ScrollToTop;