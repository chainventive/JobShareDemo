"use client"

import React from 'react'

import { Flex, Center } from '@chakra-ui/react'

import useJobs from '@/hook/useJobs'

const Jobs = () => {

    const { isUserConnected, userAddress } = useJobs();

    return (
        <>
            <Flex p="0.5rem">
                <Center width='100%'>

                    - JOB COMPONENT -

                </Center>
            </Flex>
        </>
    )
}

export default Jobs