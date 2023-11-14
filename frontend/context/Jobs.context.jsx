"use client"

const { createContext } = require("react");

import { useState, useEffect, useReducer } from 'react';
import { contractAbi, contractAddress } from '@/constants/index' 
import { readContract, watchContractEvent  } from '@wagmi/core'
import { usePublicClient, useAccount } from 'wagmi';

import jobsContextReducer, { JOBS_EVENTS_UPDATE_ACTION }  from './Jobs.reducer';

const JobsContext = createContext(null);

export default JobsContext; 

const JobsContextProvider = ({children}) => {

    const viemPublicClient = usePublicClient();

    const { address, isConnected } = useAccount();

    const [ state, dispatchFromEventsAction ] = useReducer(jobsContextReducer, {
        addedJobCount: 0,
        takenJobCount: 0,
        finishedAndPaidJobCount: 0,
        jobs: []
    });

    const listenToAllEvents = async () => {
    
        const allEvents = await viemPublicClient.getContractEvents({
            address: contractAddress,
            abi: contractAbi,
            fromBlock: 0n,
            toBlock: 'latest'
        });

        dispatchFromEventsAction({
            type: JOBS_EVENTS_UPDATE_ACTION,
            payload: { logs: allEvents }
        });
        

        const eventListener = watchContractEvent({

                address: contractAddress,
                abi: contractAbi,
                eventName: 'allEvents',

        }, (logs) => {
                
                dispatchFromEventsAction({

                    type: JOBS_EVENTS_UPDATE_ACTION,
                    payload: { logs }

                });

            },
        );

        return () => eventListener.stop();
    };

    useEffect(() => {
        listenToAllEvents();
    }, []);

    useEffect(() => {
    }, [isConnected, address]);

    return (
        
        <JobsContext.Provider value={{ 
            isUserConnected: isConnected, 
            userAddress: address,
            addedJobCount: state.addedJobCount,
            takenJobCount: state.takenJobCount,
            finishedAndPaidJobCount: state.finishedAndPaidJobCount,
            jobs: state.jobs
        }}>
            { children }
        </JobsContext.Provider>
    )
};

export { JobsContextProvider }