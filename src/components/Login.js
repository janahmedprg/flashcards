import { ChakraProvider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '@chakra-ui/react';
import '../styles/grid.css';
import '../styles/input_field.css';

import '../styles/renderCards.css';
import '../styles/loginStyles.css';

import { Box, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();
    const handleLoggingIn = async () => {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        const res = await fetch('http://34.42.246.209:5000/login', {
            body: formData,
            method: 'POST',
        });
        if (res.status === 403 || res.status === 401) {
            alert('Invalid login. Please try again.');
        } else {
            const data = await res.json();
            localStorage.setItem(
                'credentials',
                btoa(`${username}:${password}`)
            );
            localStorage.setItem('currUserId', data);
            navigate('/home');
        }
    };
    return (
        <div className='cc-login'>
            <div className='login-container'>
                <ChakraProvider>
                    <Box
                        height='60vh'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        flexDirection='column'
                        marginLeft='20%'
                        marginRight='20%'
                    >
                        <Text
                            fontSize='3xl'
                            mb={6}
                            fontFamily={'Elianto'}
                            color={'white'}
                        >
                            Login to HoloFlash
                        </Text>
                        <FormControl
                            id='email'
                            borderColor={'white'}
                            isRequired
                        >
                            <FormLabel color={'white'} fontFamily={'Elianto'}>
                                Username
                            </FormLabel>
                            <Input
                                onChange={(e) => setUsername(e.target.value)}
                                lineHeight={'50px'}
                                type='email'
                            />
                        </FormControl>
                        <FormControl
                            color={'white'}
                            id='password'
                            borderColor={'white'}
                            isRequired
                            mt={4}
                        >
                            <FormLabel fontFamily={'Elianto'}>
                                Password
                            </FormLabel>
                            <Input
                                onChange={(e) => setPassword(e.target.value)}
                                lineHeight={'50px'}
                                type='password'
                            />
                        </FormControl>
                        <Button
                            colorScheme='whiteAlpha'
                            variant='solid'
                            width='75%'
                            mt={6}
                            size='lg'
                            onClick={handleLoggingIn}
                            fontFamily={'Elianto'}
                        >
                            Login
                        </Button>
                    </Box>
                </ChakraProvider>
            </div>
        </div>
    );
};

export default Login;
