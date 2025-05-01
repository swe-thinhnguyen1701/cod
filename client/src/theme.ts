import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  components: {
    Heading: {
      sizes: {
        "h1": {
          fontSize: { base: "2.986rem", lg: "3.215rem" },
        },
      },
    },
  },
});

export default theme;
