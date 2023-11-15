"use client"

import React from 'react'

import { Text, Wrap, Card, CardBody, CardFooter, Stack, Button, Badge, useToast } from '@chakra-ui/react'

import { contractAbi, contractAddress } from '@/constants'
import { waitForTransaction, prepareWriteContract, writeContract } from '@wagmi/core'

import useJobs from '@/hook/useJobs'
import Unconnected from '../unconnected/Unconnected'

const Jobs = () => {

    const { isUserConnected, userAddress, jobs } = useJobs();

    const toast = useToast();

    const takeJob = async (jobId) => {

        try {

            const { request } =  await prepareWriteContract({
                address: contractAddress,
                abi: contractAbi,
                functionName: 'takeJob',
                args: [jobId]
            });

            const { hash } = await writeContract(request);
            const data = await waitForTransaction({hash: hash });   
            
            toast({
                title: 'Good luck',
                description: "You took the job !",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });

        } 
        catch (err) {

            console.log(err.message);
            
            let msgError = err instanceof ContractFunctionExecutionError ? err.cause.reason : "An error occured"
            
            toast({
                title: 'Error.',
                description: msgError,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const payJob = async (jobId) => {
        
    }

    return (

        <>
            {
                isUserConnected ? (

                    <Wrap padding="2rem" spacing='30px' justify='center'>

                        {
                            jobs.map(job => (

                                <Card key={job.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>

                                    <Stack>

                                        <CardBody>

                                            <Text py='2'><b>Author: </b>
                                            { 
                                                job.author.substring(0,5) }...{ job.author.substring(job.author.length-4, job.author.length) 
                                            }
                                            </Text>

                                            <Text py='2'>{ job.description }</Text>

                                            <Badge variant='outline' colorScheme='gray'>{ Number(job.price) } ETH</Badge>

                                        </CardBody>

                                        {
                                            userAddress !== job.author ? (
                                                
                                                <CardFooter>
                                                {
                                                    !job.worker ? 
                                                    (
                                                        <Button variant='solid' colorScheme='green' size='sm' onClick={() => takeJob(job.id)}>Work</Button>
                                                    
                                                    ) : (

                                                        <Text as='b' color="green">Job taken</Text>
                                                    ) 
                                                }
                                                </CardFooter>

                                            ) : (
                                                
                                                <CardFooter>
                                                {
                                                    !job.worker ? 
                                                    (
                                                        <Text as='em' color="gray">Your job is awaiting ...</Text>
                                                        
                                                    ) : (
                                                        
                                                        !job.isFinishedAndPay ? (
                                                            
                                                            <Button variant='solid' colorScheme='red' size='sm' onClick={() => payJob(job.id)}>Pay</Button>

                                                        ) : (

                                                            <Text as='b' color="red">Job finished</Text>
                                                        )
                                                        
                                                    ) 
                                                }
                                                </CardFooter>
                                            )
                                            
                                        }

                                    </Stack>

                                </Card>

                            ))
                        }

                    </Wrap>

                ) : ( <Unconnected /> )
            }
        </>

    )
}

export default Jobs