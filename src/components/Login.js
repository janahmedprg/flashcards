import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import "../styles/grid.css";
import "../styles/input_field.css";

import "../styles/renderCards.css";

import { Box, Text, Input, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const handleLoggingIn = () => {
    navigate("/home");
  };
  return (
    <div>
      <ChakraProvider>
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginLeft="20%"
          marginRight="20%"
        >
          <Text fontSize="3xl" mb={6}>
            Login to HoloFlash
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleLoggingIn}
          >
            Sign In
          </Button>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Login;
