import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { HelmetProvider } from 'react-helmet-async';
import theme from "./theme.ts";
import App from './App.tsx'
import './index.css'

import HomePage from './pages/Home.tsx';
import HeroTalentPage from './pages/HeroTalent.tsx';
import HeroPage from "./pages/Hero.tsx";
import HeroDetailPage from "./pages/HeroDetail.tsx"
import TermsOfUse from './pages/TermsOfUse.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Error from './pages/Error.tsx';

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
      },
      {
        path: "/terms-of-use",
        element: <TermsOfUse />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
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
