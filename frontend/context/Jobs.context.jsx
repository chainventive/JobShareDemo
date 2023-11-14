"use client"

const { createContext } = require("react");

import { useState, useEffect } from 'react';
import { contractAbi, contractAddress } from '@/constants/index' 
import { readContract, watchContractEvent  } from '@wagmi/core'
import { usePublicClient, useAccount } from 'wagmi';

const JobsContext = createContext(null);

export default JobsContext; 

const JobsContextProvider = ({children}) => {

    const { address, isConnected } = useAccount();

    useEffect(() => {

    }, []);

    useEffect(() => {

    }, [isConnected, address]);

    return (
        <JobsContext.Provider value={{ isUserConnected: isConnected, userAddress: address }}>
            { children }
        </JobsContext.Provider>
    )
};

export { JobsContextProvider }