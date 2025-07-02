import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    console.log("Pathname or search params changed:", pathname, search);
    
    // Check if we have a genre parameter
    const searchParams = new URLSearchParams(search);
    const hasGenre = searchParams.has('genre');
    
    if (hasGenre) {
      // If we're filtering by genre, scroll to the appropriate section
      let targetId = null;
      
      if (pathname === '/movies') {
        targetId = 'movies-section';
      } else if (pathname === '/tv') {
        targetId = 'tv-section';
      }
      
      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          // Scroll to the element with a small offset for the navbar
          const offset = 80; // Adjust based on navbar height
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
          return;
        }
      }
    }
    
    // Default behavior: scroll to top
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0); 
    document.body.scrollTo(0, 0); 
  }, [pathname, search]);
};

export default useScrollToTop;
