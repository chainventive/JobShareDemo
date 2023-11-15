"use client"

import React from 'react'

import { Flex, Center, Box, Spacer, Button, ButtonGroup } from '@chakra-ui/react'

import Link from "next/link"

const Nav = () => {

    const navItemStyle = {
        backgroundColor: "#4f4f4f", 
        borderRadius: "0.25rem", 
        padding: "0.15rem 0.5rem"
    }

    return (

        <>
            <Center p="0.5rem" bg="#edf2f7" color="white" align="center" borderTop="1px solid #80808029" borderBottom="1px solid #80808029">

                <Button colorScheme='gray' size='sm'>

                    <Link href="/">Home</Link>
                    
                </Button>

                <div style={{ width: '2rem', color: 'black' }}>-</div>

                <Button colorScheme='gray' size='sm'>

                    <Link href="/job">Add Job</Link>

                </Button>

            </Center>
        </>

    )
}

export default Nav