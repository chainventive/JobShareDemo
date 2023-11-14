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

    // State Reducer
    const [ state, dispatchFromEventsAction ] = useReducer(jobsContextReducer, {
        addedJobCount: 0,
        takenJobCount: 0,
        finishedAndPaidJobCount: 0
    });

    const listenToAllEvents = async () => {

        const allEvents = await viemPublicClient.getContractEvents({
            address: contractAddress,
            abi: contractAbi,
            fromBlock: 0n,
            toBlock: 'latest'
        });

        // Set the state with the Event get
        dispatchFromEventsAction({
            type: JOBS_EVENTS_UPDATE_ACTION,
            payload: { logs: allEvents }
        });

        // Écoutez en continu les nouveaux événements
        const eventListener = watchContractEvent(
            {
                address: contractAddress,
                abi: contractAbi,
                eventName: 'allEvents', // Mettez le nom réel de votre événement ici
            },
            (logs) => {

                // Set the state with the new Event
                dispatchFromEventsAction({
                    type: JOBS_EVENTS_UPDATE_ACTION,
                    payload: { logs }
                });
            },
        );

        // Return the listener when the components is break
        return () => eventListener.stop();
    };

    useEffect(() => {
        listenToAllEvents();
    }, []);

    useEffect(() => {

        console.log("addedJobCount -> " + state.addedJobCount);
        console.log("takenJobCount -> " + state.takenJobCount);
        console.log("finishedAndPaidJobCount -> " + state.finishedAndPaidJobCount);

    }, [isConnected, address]);

    return (
        <JobsContext.Provider value={{ 
            isUserConnected: isConnected, 
            userAddress: address,
            addedJobCount: state.addedJobCount,
            takenJobCount: state.takenJobCount,
            finishedAndPaidJobCount: state.finishedAndPaidJobCount
        }}>
            { children }
        </JobsContext.Provider>
    )
};

export { JobsContextProvider }