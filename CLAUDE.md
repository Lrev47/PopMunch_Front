# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

PopMunch is a React-based movie and TV show discovery platform that uses The Movie Database (TMDb) API. The project is currently undergoing a migration from CSS modules to a styled-components design system.

### Key Technologies
- **React 18.2.0** with Vite 5.2.0 as the build tool
- **Redux Toolkit** with RTK Query for state management and API calls
- **React Router DOM v6** for client-side routing
- **styled-components** for the new design system (migrating from CSS modules)
- **Framer Motion** for animations

### Project Structure
- `src/MovieAPI/` - RTK Query API slices for TMDb integration
  - `MovieApi.js` - Movie endpoints (popular, trending, search, details, credits, videos, genres, watch providers)
  - `TVShowsApi.js` - TV show endpoints (popular, trending, search, details, seasons, genres)
  - `index.js` - Centralized exports for all API hooks
- `src/StateManagment/` - Redux store configuration
  - `store.js` - Redux store setup with API reducers
  - `websiteSlice.js` - UI state management (sidebar toggle)
- `src/components/` - React components organized by feature
  - Page components: `LandingPage.jsx`, `MoviePage.jsx`, `TVPage.jsx`, `SingleMovie.jsx`, `SingleTvShow.jsx`
  - Hero components: `MainHero.jsx`, `MovieHero.jsx`, `TVHero.jsx`
  - UI components: `NavBar.jsx`, `SideNav.jsx`, `Footer.jsx`
  - Search components: `MovieSearch.jsx`, `TVShowSearch.jsx`
- `src/design-system/` - New styled-components design system
  - `tokens.js` - Design tokens (colors, typography, spacing, breakpoints, animations)
  - `GlobalStyles.js` - Global styles using styled-components
  - `ThemeProvider.jsx` - Theme context wrapper
  - `components/` - Reusable styled components
- `src/Style-backup/` - Backup of old CSS module files (being phased out)

### API Integration
The app integrates with TMDb API using RTK Query. Base URL: `https://api.themoviedb.org/3`

Key endpoints:
- Movies: `/movie/popular`, `/movie/{id}`, `/search/movie`, `/movie/{id}/credits`, `/movie/{id}/videos`
- TV Shows: `/tv/popular`, `/tv/{id}`, `/search/tv`, `/tv/{id}/season/{season}`
- Collections: `/collection/{id}`, `/search/collection`
- Genres: `/genre/movie/list`, `/genre/tv/list`
- Watch Providers: `/watch/providers/movie`

### Routing Structure
- `/` - Landing page with featured content
- `/movies` - Movie listing page
- `/tv` - TV show listing page
- `/movie/:id` - Individual movie details
- `/tv/:id` - Individual TV show details
- `/collections/:id` - Collection details
- `/logIn` - Login page (route exists but component not implemented)

### Design System
The project uses a comprehensive design system with:
- **Colors**: Dark theme with grey backgrounds (#0A0A0A to #2D2D2D) and red gradient accents
- **Typography**: Bebas Neue (display), Inter (body), Space Grotesk (accent)
- **Responsive**: Mobile-first breakpoints from xs (480px) to 2xl (1536px)
- **Animations**: Predefined Framer Motion variants (fadeIn, slideUp, scaleIn, stagger)

### Important Notes
- No TypeScript configuration - project uses plain JavaScript/JSX
- No testing framework configured
- TMDb API authentication token is hardcoded in the API files (should use environment variables)
- CSS migration in progress - old styles backed up in `src/Style-backup/`
- Custom `ScrollToTop` utility handles route navigation scroll behavior