import { ChakraProvider } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import "../styles/grid.css";
import "../styles/input_field.css";

import "../styles/renderCards.css";

import { Box, Text, Input, FormControl, FormLabel } from "@chakra-ui/react";

const Signup = () => {
  const navigate = useNavigate();
  const handleSignUp = () => {
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
            Sign Up for HoloFlash
          </Text>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>username</FormLabel>
            <Input type="username" />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl id="confirm_password" isRequired mt={4}>
            <FormLabel>confirm password</FormLabel>
            <Input type="confirm_password" />
          </FormControl>
          <Button
            colorScheme="teal"
            variant="solid"
            width="75%"
            mt={6}
            size="lg"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </ChakraProvider>
    </div>
  );
};

export default Signup;
