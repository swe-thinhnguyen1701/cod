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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
)
