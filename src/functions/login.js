import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

function loginWindow() {
  return (
    <ChakraProvider>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
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
          width="100%"
          mt={6}
          size="lg"
        >
          Sign In
        </Button>
      </Box>
    </ChakraProvider>
  );
}

export default loginWindow;
