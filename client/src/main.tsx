import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "./theme.ts";
import App from './App.tsx'
import './index.css'

import HomePage from './pages/Home.tsx';
import HeroTalentPage from './pages/HeroTalent.tsx';
import HeroPage from "./pages/Hero.tsx";
import HeroDetailPage from "./pages/HeroDetail.tsx"
import Error from './pages/Error.tsx';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/hero-talent",
        element: <HeroTalentPage />
      },
      {
        path: "/heroes",
        element: <HeroPage />
      },
      {
        path: "/heroes/:heroName",
        element: <HeroDetailPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </HelmetProvider>
  </StrictMode>
)
