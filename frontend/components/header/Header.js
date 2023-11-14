'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Flex, Spacer, Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

const Header = () => {

    return (
        <Flex p="2rem" bg="#eee">
            <Box>
                <Heading>JobShare</Heading>
            </Box>
            <Spacer />
            <Box>
                <ConnectButton />
            </Box>
        </Flex>
    )
}

export default Header