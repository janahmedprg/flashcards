import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import "../styles/grid.css";
import "../styles/input_field.css";

import "../styles/renderCards.css";
import "../styles/loginStyles.css";

import { Box, Text, Input, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const handleLoggingIn = () => {
    navigate("/home");
  };
  return (
    <div className="cc-login">
      <div className="login-container">
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
            <Text fontSize="3xl" mb={6} fontFamily={"Elianto"} color={"white"}>
              Login to HoloFlash
            </Text>
            <FormControl id="email" borderColor={"white"} isRequired>
              <FormLabel color={"white"} fontFamily={"Elianto"}>
                Email address
              </FormLabel>
              <Input lineHeight={'50px'} type="email" />
            </FormControl>
            <FormControl
              color={"white"}
              id="password"
              borderColor={"white"}
              isRequired
              mt={4}
            >
              <FormLabel fontFamily={"Elianto"}>Password</FormLabel>
              <Input lineHeight={'50px'} type="password" />
            </FormControl>
            <Button
              colorScheme="whiteAlpha"
              variant="solid"
              width="75%"
              mt={6}
              size="lg"
              onClick={handleLoggingIn}
              fontFamily={"Elianto"}
            >
              Sign In
            </Button>
          </Box>
        </ChakraProvider>
      </div>
    </div>
  );
};

export default Login;
