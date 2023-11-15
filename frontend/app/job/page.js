'use client'
import Header from '@/components/header/Header'
import { contractAbi, contractAddress } from '@/constants'
import { Alert, AlertIcon, Button, Center, Container, Flex, Heading, Input, InputGroup, InputLeftAddon, Text, useToast, Stack, StackDivider, Box, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState } from 'react'
import { waitForTransaction, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ContractFunctionExecutionError, parseEther } from 'viem'
import Unconnected from '@/components/unconnected/Unconnected'


const page = () => {

    // Get Connected user's Infos
    const { isConnected } = useAccount()

    const [priceAmount, setPriceAmount ] = useState(0)
    const [description, setDescription ] = useState('')
    
    //Toasts
    const toast = useToast()
    const addJob = async () => {
        try {
            const { request } =  await prepareWriteContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'addJob',
                args: [description],
                value: parseEther(priceAmount)
            })
            const { hash } = await writeContract(request);
            const data = await waitForTransaction({
                hash: hash,
            })
            toast({
                title: 'Congratulations.',
                description: "You have made a Job!",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setPriceAmount(0)
            setDescription('')
            return hash;
        } catch(err) {
            console.log(err.message)
            let msgError = err instanceof ContractFunctionExecutionError ? err.cause.reason : "An error occured"
            toast({
                title: 'Error.',
                description: msgError,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }
    return (
        <main>
            <Header/>
            <Flex p="2rem" width="100%">

                { 
                    isConnected ? (

                        <Center w="100%">

                            <Card w="35rem">

                                <CardHeader>
                                    <Heading size='md'>Add a new job</Heading>
                                </CardHeader>

                                <CardBody>

                                    <Stack spacing='4'>

                                        <Box>

                                            <Text size='xs' marginBottom="0.5rem">Description:</Text>

                                            <InputGroup>
                                                <Input type="" onChange={e => setDescription(e.target.value)} placeholder="describe the job" /> 
                                            </InputGroup>

                                        </Box>

                                        <Box>

                                            <Text size='xs' marginBottom="0.5rem">Price:</Text>

                                            <InputGroup>
                                                <Input onChange={e => setPriceAmount(e.target.value)} placeholder="how much ETH you will pay for it" />
                                            </InputGroup>

                                        </Box>

                                        <Box>
                                            <Button marginTop="1.5rem" w="100%" onClick={() => addJob()} colorScheme="green">Add</Button>
                                        </Box>

                                    </Stack>

                                </CardBody>

                            </Card>

                        </Center>

                    ) : ( <Unconnected/> )
                }

            </Flex>
        </main>
    )
}

export default page