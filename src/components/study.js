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
                <div>  
                    <h1
                    style={{fontSize: "150%"}}>
                        {cards.set_name}
                    </h1>
                    
                </div>
                <RenderCards cards={cards} />
            </ChakraProvider>
        </div>


    )

}


export default Study;






