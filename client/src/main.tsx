import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme.ts";
import App from "./App.tsx"
import "./index.css"

import HomePage from "./pages/Home.tsx";
import HeroTalentPage from "./pages/HeroTalent.tsx";
import HeroPage from "./pages/Hero.tsx";
import HeroDetailPage from "./pages/HeroDetail.tsx"
import TermsOfUsePage from "./pages/TermsOfUse.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicy.tsx";
import AboutPage from "./pages/About.tsx";
import ContactPage from "./pages/Contact.tsx";
import ArtifactPage from "./pages/Artifact.tsx";
import ArtifactDetailPage from "./pages/ArtifactDetail.tsx";
import ErrorPage from "./pages/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
        element: <TermsOfUsePage />
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path: "/artifacts",
        element: <ArtifactPage />
      },
      {
        path: "/artifacts/:artifactName",
        element: <ArtifactDetailPage />
      }
    ]
  }
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </HelmetProvider>
  </StrictMode>
)
