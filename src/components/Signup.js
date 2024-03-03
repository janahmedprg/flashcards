import { ChakraProvider } from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/grid.css";
import "../styles/input_field.css";

import "../styles/renderCards.css";
import "../styles/signupStyles.css";

import { Box, Text, Input, FormControl, FormLabel } from "@chakra-ui/react";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const handleSignUp = async () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const res = await fetch("http://34.42.246.209:5000/register", {
      body: formData,
      method: "POST",
    });
    if (res.status === 403 || res.status === 401 || res.status === 500) {
      alert("Username already in use.");
    } else if (confirmPassword !== password) {
      alert("Your passwords do not match.");
    } else if (username.length < 5) {
      alert("Username must be at least 5 characters.");
    } else {
      const data = await res.json();
      localStorage.setItem("credentials", btoa(`${username}:${password}`));
      localStorage.setItem("currUserId", data);
      navigate("/home");
    }
  };
  return (
    <div className="cc-signup">
      <div className="signup-container">
        <ChakraProvider>
          <Box
            height="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            marginLeft="20%"
            marginRight="20%"
            fontFamily={"Elianto"}
            color={"white"}
          >
            <Text fontSize="3xl" mb={6}>
              Sign Up for HoloFlash
            </Text>
            {/* <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input lineHeight={'50px'} type="email" />
            </FormControl> */}
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                lineHeight={"50px"}
                type="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                lineHeight={"50px"}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm_password" isRequired mt={4}>
              <FormLabel>Confirm password</FormLabel>
              <Input
                lineHeight={"50px"}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="whiteAlpha"
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
    </div>
  );
};

export default Signup;
