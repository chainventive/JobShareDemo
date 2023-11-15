import React from 'react'

import { Container, Center, Text } from '@chakra-ui/react'

const Unconnected = () => {

    return (

        <Container backgroundColor="black" color="white" borderRadius="1rem" p="2rem" marginTop="4rem">
            <Center>
                <Text as='b' fontSize='l'>Please connect your wallet to our dApp</Text>
            </Center>
        </Container>

    )

}

export default Unconnected