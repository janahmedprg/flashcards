import { extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  colors: {
    primary: {
      50: "#f5f5ff",
      100: "#dbe3ff",
      200: "#afc8ff",
      300: "#82aaff",
      400: "#558eff",
      500: "#4255ff", // Default color set to #4255ff
      600: "#1f4faf",
      700: "#133a7d",
      800: "#08254b",
      900: "#010b1c",
    },
    secondary: {
      50: "#fff5f5",
      100: "#ffdbe0",
      200: "#ffafc1",
      300: "#ff82a0",
      400: "#ff5580",
      500: "#ff2d66",
      600: "#ff1f4e",
      700: "#ff1336",
      800: "#ff0820",
      900: "#ff010b",
    },
    // Add more custom colors here as needed
  },
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Poppins', sans-serif",
    // Add more font styles here as needed
  },
  components: {
    Button: {
      // Define base style for Button component
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      // Define default variant
      defaultProps: {
        variant: "primary",
      },
      // Define sizes for Button component
      sizes: {
        sm: {
          fontSize: "sm",
          padding: "0.5rem 1rem",
        },
        md: {
          fontSize: "md",
          padding: "0.75rem 1.5rem",
        },
        lg: {
          fontSize: "lg",
          padding: "1rem 2rem",
        },
      },
      // Define variants for Button component
      variants: {
        primary: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
          },
        },
        secondary: {
          bg: "secondary.500",
          color: "white",
          _hover: {
            bg: "secondary.600",
          },
        },
      },
    },
    // Add more component customizations here
  },
});

export default chakraTheme;
