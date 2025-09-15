import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // Also scroll to top on initial page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Use 'auto' for instant scroll on initial load
    });
  }, []);

  return null;
};

export default ScrollToTop;