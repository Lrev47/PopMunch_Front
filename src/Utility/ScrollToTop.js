import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("Pathname changed:", pathname);
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0); 
    document.body.scrollTo(0, 0); 
  }, [pathname]);
};

export default useScrollToTop;
