import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import {
    Box,
    Text,
    Button,
    Input,
    FormControl,
    FormLabel,
  } from "@chakra-ui/react";

import RenderCards from '../functions/renderCards';

const Study = ( {cards} ) => {

    return (
        <div>
            <ChakraProvider>

                <RenderCards cards={cards} />

            </ChakraProvider>
        </div>


    )

}


export default Study;






