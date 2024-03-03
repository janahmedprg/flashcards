import { useNavigate } from "react-router-dom";
import "../styles/displayStyles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const Display = () => {
  const navigate = useNavigate();
  const handleLoggingIn = () => {
    navigate("login");
  };
  const handleSignUp = () => {
    navigate("signup");
  };
  return (
    <div className="containerDisplay">
      <ChakraProvider>
        <Box
          height="60vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginLeft="20%"
          marginRight="20%"
        >
          <Text fontSize="3xl" mb={6} fontFamily={"Elianto"}>
            Login to HoloFlash
          </Text>
          <Button
            colorScheme="blackAlpha"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleLoggingIn}
            fontFamily={"Elianto"}
          >
            Login
          </Button>
          <Button
            colorScheme="blackAlpha"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleSignUp}
            fontFamily={"Elianto"}
          >
            Sign Up
          </Button>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Display;
