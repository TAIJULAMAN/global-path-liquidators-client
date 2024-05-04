import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface ScrollToTopProps {}

const ScrollToTop: React.FC<ScrollToTopProps> = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
