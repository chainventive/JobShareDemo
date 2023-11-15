'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Flex, Spacer, Heading, Box } from '@chakra-ui/react'
import Nav from "@/components/nav/Nav"

const Header = () => {

    return (
        <>
            <Flex p="2rem" bg="#edf2f7">

                <Box>
                    <Heading>Job#Share</Heading>
                </Box>

                <Spacer />

                <Box>
                    <ConnectButton />
                </Box>
                
            </Flex>

            <Nav/>
        </>
    )
}

export default Header