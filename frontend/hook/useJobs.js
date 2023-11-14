"use client"

import JobsContext from "@/context/Jobs.context";

import { useContext, useEffect } from "react";

const useJobs = () => {
    
    const context = useContext(JobsContext);

    if (!context) throw new Error('useJobs must be used within a JobsContextProvider');

    return context;
}

export default useJobs;