'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Flex, Spacer, Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Link from "next/link"

const Header = () => {

    return (
        <Flex p="2rem" bg="#eee">
            <Box>
                <Heading>JobShare</Heading>
            </Box>
            <Spacer />
            <Box>
                <Link href="/">Home</Link>
            </Box>
            <Spacer />
            <Box>
                <Link href="/job">Add a job</Link>
            </Box>
            <Spacer />
            <Box>
                <ConnectButton />
            </Box>
        </Flex>
    )
}

export default Header