'use client'
import Header from '@/components/header/Header'
import { contractAbi, contractAddress } from '@/constants'
import { Alert, AlertIcon, Button, Center, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { waitForTransaction, prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ContractFunctionExecutionError, parseEther } from 'viem'


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
                {isConnected ? (
                    <Flex direction="column" width="100%">
                        <Center>
                            <Heading as="h2" sizze="xl">
                                Add a job
                            </Heading>
                            <Flex mt="1rem">
                                <Text mb='8px'>Description: </Text>
                                <Input type="" onChange={e => setDescription(e.target.value)} placeholder="The description of the job" />                                
                            </Flex>
                            <Flex mt="1rem">
                                <Text mb='8px'>Price: </Text>
                                <Input onChange={e => setPriceAmount(e.target.value)} placeholder="Amount in Eth" />
                                <Button onClick={() => addJob()} colorScheme="green">Add</Button>
                            </Flex>
                        </Center>

                    </Flex>
                ) : (
                    <Alert status='warning'>
                        <AlertIcon/>  Please connect your Wallet
                    </Alert>
                )}
            </Flex>
        </main>
    )
}

export default page